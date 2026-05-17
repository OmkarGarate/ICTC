import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In, Not } from 'typeorm';

import { Blog } from './entities/blog.entity';
import { BlogTag } from './entities/blog-tag.entity';
import { Tag } from './entities/tag.entity';

import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

import { DB_CONSTANTS } from '../../common/constants/db.constants';
import { deleteFiles } from '../../common/utils/file.util';

@Injectable()
export class BlogsService {

  constructor(
    @InjectRepository(Blog)
    private readonly repo: Repository<Blog>,

    @InjectRepository(BlogTag)
    private readonly tagRepo: Repository<BlogTag>,

    @InjectRepository(Tag)
    private readonly masterTagRepo: Repository<Tag>,

    private readonly dataSource: DataSource,
  ) {}

  private async attachTags(blogs: Blog[]) {
    if (!blogs.length) return [];

    const blogIds = blogs.map((b) => b.id);

    const blogTags = await this.tagRepo.find({
      where: { blogId: In(blogIds) },
    });

    const tagIds = [...new Set(blogTags.map((bt) => bt.tagId))];
    const masterTags = tagIds.length
      ? await this.masterTagRepo.find({ where: { id: In(tagIds) } })
      : [];

    return blogs.map((blog) => ({
      ...blog,
      tags: blogTags
        .filter((bt) => bt.blogId === blog.id)
        .map((bt) => masterTags.find((mt) => mt.id === bt.tagId))
        .filter(Boolean),
      content: blog.content ? this.parseContent(blog.content) : null,
    }));
  }

  private parseContent(raw: string) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }

  async create(dto: CreateBlogDto, files: any) {
    return await this.dataSource.transaction(async (manager) => {

      const existing = await manager.findOne(Blog, {
        where: { slug: dto.slug },
      });

      if (existing) {
        deleteFiles(files);
        throw new BadRequestException('Slug already exists');
      }

      const coverFile = files?.image?.[0]?.filename;

      let parsedContent: any = dto.content;

      try {
        parsedContent =
          typeof dto.content === 'string'
            ? JSON.parse(dto.content)
            : dto.content;
      } catch {}

      const contentImages = files?.contentImages || [];

      const replaceImageUrls = (nodes: any[]) => {
        for (const node of nodes || []) {
          if (
            node.type === 'image' &&
            typeof node.attrs?.src === 'string' &&
            node.attrs.src.startsWith('__UPLOAD_')
          ) {
            const index = Number(
              node.attrs.src
                .replace('__UPLOAD_', '')
                .replace('__', '')
            );

            const file = contentImages[index];

            if (file) {
              node.attrs.src = `/uploads/${file.filename}`;
            }
          }

          if (node.content) {
            replaceImageUrls(node.content);
          }
        }
      };

      replaceImageUrls(parsedContent?.content || []);

      const blog = await manager.save(Blog, {
        title: dto.title,
        slug: dto.slug,
        type: 'Blog',
        date: dto.date,
        category: dto.category,
        author: dto.author,
        image: coverFile ? `/uploads/${coverFile}` : null,
        content: parsedContent ? JSON.stringify(parsedContent) : null,
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        keywords: dto.keywords,
      });

      const tagIds = dto.tags || [];

      const savedBlogTags: BlogTag[] = [];
      for (const tagId of tagIds) {
        const bt = await manager.save(BlogTag, { blogId: blog.id, tagId });
        savedBlogTags.push(bt);
      }

      // FIX: Build the return value within the transaction using `manager`
      // Previously called this.findOne(blog.id) which uses this.repo (outside tx),
      // and on some DB configs the newly-inserted row isn't visible yet → NotFoundException.
      const masterTagIds = [...new Set(savedBlogTags.map((bt) => bt.tagId))];
      const masterTags = masterTagIds.length
        ? await manager.find(Tag, { where: { id: In(masterTagIds) } })
        : [];

      return {
        ...blog,
        tags: savedBlogTags
          .map((bt) => masterTags.find((mt) => mt.id === bt.tagId))
          .filter(Boolean),
        content: blog.content ? this.parseContent(blog.content) : null,
      };
    });
  }

  async findAll(isDeleted?: boolean) {
    const filter =
      typeof isDeleted === 'boolean'
        ? isDeleted
        : DB_CONSTANTS.IS_DELETED.NO;

    const blogs = await this.repo.find({
      where: { isDeleted: filter },
      order: { createdAt: 'DESC' },
    });

    if (!blogs.length) return [];

    return this.attachTags(blogs);
  }

  async findOne(id: number, isDeleted?: boolean) {
    const filter =
      typeof isDeleted === 'boolean'
        ? isDeleted
        : DB_CONSTANTS.IS_DELETED.NO;

    const blog = await this.repo.findOne({
      where: { id, isDeleted: filter },
    });

    if (!blog) throw new NotFoundException('Blog not found');

    const [result] = await this.attachTags([blog]);
    return result;
  }

  async findBySlug(slug: string) {
    const blog = await this.repo.findOne({
      where: { slug, isDeleted: false },
    });

    if (!blog) throw new NotFoundException('Blog not found');

    const [result] = await this.attachTags([blog]);
    return result;
  }

  /**
   * Find similar blogs: same category, excluding current blog.
   * Falls back to latest blogs if no same-category siblings exist.
   */
  async findSimilar(id: number, limit = 3) {
    const current = await this.repo.findOne({
      where: { id, isDeleted: false },
    });

    if (!current) throw new NotFoundException('Blog not found');

    let similar: Blog[] = [];

    if (current.category) {
      similar = await this.repo.find({
        where: {
          isDeleted: false,
          category: current.category,
          id: Not(id),
        },
        order: { createdAt: 'DESC' },
        take: limit,
      });
    }

    if (similar.length < limit) {
      const needed = limit - similar.length;
      const existingIds = [id, ...similar.map((b) => b.id)];

      const extras = await this.repo.find({
        where: { isDeleted: false },
        order: { createdAt: 'DESC' },
        take: limit + existingIds.length,
      });

      const filtered = extras
        .filter((b) => !existingIds.includes(b.id))
        .slice(0, needed);

      similar = [...similar, ...filtered];
    }

    if (!similar.length) return [];

    return this.attachTags(similar);
  }

  /**
   * Return distinct non-null category values from all active blogs.
   */
  async findCategories(): Promise<string[]> {
    const rows = await this.repo
      .createQueryBuilder('blog')
      .select('DISTINCT blog.category', 'category')
      .where('blog.isDeleted = false')
      .andWhere('blog.category IS NOT NULL')
      .andWhere("blog.category != ''")
      .orderBy('blog.category', 'ASC')
      .getRawMany();

    return rows.map((r) => r.category as string).filter(Boolean);
  }

  async update(id: number, dto: UpdateBlogDto, files?: any) {
    return await this.dataSource.transaction(async (manager) => {

      const blog = await manager.findOne(Blog, {
        where: { id, isDeleted: false },
      });

      if (!blog) throw new NotFoundException('Blog not found');

      if (dto.slug && dto.slug !== blog.slug) {
        const exists = await manager.findOne(Blog, {
          where: { slug: dto.slug },
        });
        if (exists) throw new BadRequestException('Slug already exists');
      }

      if (files?.image?.[0]) {
        if (blog.image) {
          const oldFilename = blog.image.replace('/uploads/', '');
          deleteFiles({ image: [{ filename: oldFilename }] });
        }
        blog.image = `/uploads/${files.image[0].filename}`;
      }

      await manager.delete(BlogTag, { blogId: id });

      const tagIds = dto.tags || [];

      let parsedContent: any = dto.content;

      try {
        parsedContent =
          typeof dto.content === 'string'
            ? JSON.parse(dto.content)
            : dto.content;
      } catch {}

      const contentImages = files?.contentImages || [];

      const replaceImageUrls = (nodes: any[]) => {
        for (const node of nodes || []) {
          if (
            node.type === 'image' &&
            typeof node.attrs?.src === 'string' &&
            node.attrs.src.startsWith('__UPLOAD_')
          ) {
            const index = Number(
              node.attrs.src
                .replace('__UPLOAD_', '')
                .replace('__', '')
            );

            const file = contentImages[index];

            if (file) {
              node.attrs.src = `/uploads/${file.filename}`;
            }
          }

          if (node.content) {
            replaceImageUrls(node.content);
          }
        }
      };

      replaceImageUrls(parsedContent?.content || []);

      for (const tagId of tagIds) {
        await manager.save(BlogTag, {
          blogId: id,
          tagId,
        });
      }

      const { tags: _tags, content: _content, ...scalarDto } = dto;

      Object.assign(blog, scalarDto);

      blog.content = parsedContent
        ? JSON.stringify(parsedContent)
        : null;

      blog.type = 'Blog';

      await manager.save(blog);

      return this.findOne(id);
    });
  }

  async remove(id: number) {
    const blog = await this.repo.findOne({
      where: { id, isDeleted: false },
    });

    if (!blog) throw new NotFoundException('Blog not found');

    blog.isDeleted = true;
    await this.repo.save(blog);

    return [];
  }

  async restore(id: number) {
    const blog = await this.repo.findOne({
      where: { id, isDeleted: true },
    });

    if (!blog) throw new NotFoundException('Blog not found');

    blog.isDeleted = false;
    await this.repo.save(blog);

    return this.findOne(id);
  }
}
