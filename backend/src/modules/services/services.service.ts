import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';

import { Service } from './entities/service.entity';
import { ServiceFaq } from './entities/service-faq.entity';
import { ServiceCategory } from './entities/service-category.entity';

import { CreateServiceDto, FaqItemDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

import { DB_CONSTANTS } from '../../common/constants/db.constants';
import { deleteFiles } from '../../common/utils/file.util';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly repo: Repository<Service>,

    @InjectRepository(ServiceFaq)
    private readonly faqRepo: Repository<ServiceFaq>,

    @InjectRepository(ServiceCategory)
    private readonly categoryRepo: Repository<ServiceCategory>,

    private readonly dataSource: DataSource,
  ) {}

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private parseFaqs(input: FaqItemDto[] | string | undefined): FaqItemDto[] {
    if (!input) return [];
    if (Array.isArray(input)) return input;

    const str = (input as string).trim();
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) return parsed;
      if (typeof parsed === 'object' && parsed !== null) return [parsed];
    } catch {
      // malformed
    }
    return [];
  }

  private async saveFaqs(
    manager: any,
    serviceId: number,
    faqs: FaqItemDto[],
  ): Promise<void> {
    await manager.delete(ServiceFaq, { serviceId });
    for (let i = 0; i < faqs.length; i++) {
      await manager.save(ServiceFaq, {
        serviceId,
        question: faqs[i].question,
        answer: faqs[i].answer,
        sequence: i,
      });
    }
  }

  private async buildResponse(serviceId: number, manager = this.dataSource.manager) {
    const service = await manager.findOne(Service, { where: { id: serviceId } });
    if (!service) return null;

    const faqs = await manager.find(ServiceFaq, {
      where: { serviceId },
      order: { sequence: 'ASC' },
    });

    // Attach category name if categoryId is set
    let category: ServiceCategory | null = null;
    if (service.categoryId) {
      category = await manager.findOne(ServiceCategory, {
        where: { id: service.categoryId },
      });
    }

    return {
      ...service,
      categoryName: category?.name ?? null,
      categorySlug: category?.slug ?? null,
      faqs: faqs.map((f) => ({ question: f.question, answer: f.answer })),
    };
  }

  // ─── CREATE ───────────────────────────────────────────────────────────────

  async create(dto: CreateServiceDto, files: any) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const existing = await manager.findOne(Service, { where: { slug: dto.slug } });
        if (existing) {
          deleteFiles(files);
          throw new BadRequestException('Slug already exists');
        }

        const coverImageFile = files?.coverImage?.[0]?.filename;

        const service = await manager.save(Service, {
          slug: dto.slug,
          title: dto.title,
          altText: dto.altText,
          seoTitle: dto.seoTitle,
          metaDescription: dto.metaDescription,
          content: dto.content,
          coverImage: coverImageFile ? `/uploads/${coverImageFile}` : null,
          categoryId: dto.categoryId ?? null,
        });

        const faqs = this.parseFaqs(dto.faqs as any);
        await this.saveFaqs(manager, service.id, faqs);

        return await this.buildResponse(service.id, manager);
      });
    } catch (error) {
      deleteFiles(files);
      throw error;
    }
  }

  // ─── FIND ALL ─────────────────────────────────────────────────────────────

  async findAll(isDeleted?: boolean) {
    const filter =
      typeof isDeleted === 'boolean' ? isDeleted : DB_CONSTANTS.IS_DELETED.NO;

    const services = await this.repo.find({
      where: { isDeleted: filter },
      order: { createdAt: 'DESC' },
    });

    if (!services.length) return [];

    const serviceIds = services.map((s) => s.id);

    const faqs = await this.faqRepo.find({
      where: { serviceId: In(serviceIds) },
      order: { sequence: 'ASC' },
    });

    // Fetch all referenced categories in one query
    const categoryIds = [...new Set(services.map((s) => s.categoryId).filter(Boolean))] as number[];
    const categories = categoryIds.length
      ? await this.categoryRepo.findBy({ id: In(categoryIds) })
      : [];

    return services.map((service) => {
      const category = categories.find((c) => c.id === service.categoryId) ?? null;
      return {
        ...service,
        categoryName: category?.name ?? null,
        categorySlug: category?.slug ?? null,
        faqs: faqs
          .filter((f) => f.serviceId === service.id)
          .map((f) => ({ question: f.question, answer: f.answer })),
      };
    });
  }

  // ─── FIND ONE ─────────────────────────────────────────────────────────────

  async findOne(id: number, isDeleted?: boolean) {
    const filter =
      typeof isDeleted === 'boolean' ? isDeleted : DB_CONSTANTS.IS_DELETED.NO;

    const service = await this.repo.findOne({ where: { id, isDeleted: filter } });
    if (!service) throw new NotFoundException('Service not found');

    return await this.buildResponse(service.id);
  }

  // ─── FIND BY SLUG ─────────────────────────────────────────────────────────

  async findBySlug(slug: string) {
    const service = await this.repo.findOne({
      where: { slug, isDeleted: DB_CONSTANTS.IS_DELETED.NO },
    });
    if (!service) throw new NotFoundException('Service not found');

    return await this.buildResponse(service.id);
  }

  // ─── UPDATE ───────────────────────────────────────────────────────────────

  async update(id: number, dto: UpdateServiceDto, files?: any) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const service = await manager.findOne(Service, {
          where: { id, isDeleted: false },
        });
        if (!service) throw new NotFoundException('Service not found');

        if (dto.slug && dto.slug !== service.slug) {
          const exists = await manager.findOne(Service, { where: { slug: dto.slug } });
          if (exists) throw new BadRequestException('Slug already exists');
        }

        if (files?.coverImage?.[0]) {
          service.coverImage = `/uploads/${files.coverImage[0].filename}`;
        }

        const scalarFields: Array<keyof Service> = [
          'slug', 'title', 'altText', 'seoTitle', 'metaDescription', 'content', 'categoryId',
        ];

        for (const field of scalarFields) {
          if ((dto as any)[field] !== undefined) {
            (service as any)[field] = (dto as any)[field];
          }
        }

        // Allow explicitly unsetting category (categoryId = null)
        if ('categoryId' in dto && (dto.categoryId === null || dto.categoryId === undefined)) {
          service.categoryId = null;
        }

        await manager.save(service);

        if (dto.faqs !== undefined) {
          await this.saveFaqs(manager, id, this.parseFaqs(dto.faqs as any));
        }

        return await this.buildResponse(id, manager);
      });
    } catch (error) {
      deleteFiles(files);
      throw error;
    }
  }

  // ─── DELETE (soft) ────────────────────────────────────────────────────────

  async remove(id: number) {
    const service = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!service) throw new NotFoundException('Service not found');

    service.isDeleted = true;
    await this.repo.save(service);

    return [];
  }

  // ─── RESTORE ──────────────────────────────────────────────────────────────

  async restore(id: number) {
    const service = await this.repo.findOne({ where: { id, isDeleted: true } });
    if (!service) throw new NotFoundException('Service not found');

    service.isDeleted = false;
    await this.repo.save(service);

    return service;
  }
}