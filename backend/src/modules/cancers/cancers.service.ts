import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';

import { Cancer } from './entities/cancer.entity';
import { CancerFaq } from './entities/cancer-faq.entity';

import { CreateCancerDto, FaqItemDto } from './dto/create-cancer.dto';
import { UpdateCancerDto } from './dto/update-cancer.dto';

import { DB_CONSTANTS } from '../../common/constants/db.constants';
import { deleteFiles } from '../../common/utils/file.util';

// All rich-text section field names (mirrors entity + DTO)
const SECTION_FIELDS = [
  'overview',
  'riskFactors',
  'symptoms',
  'diagnosis',
  'treatment',
  'dosAndDonts',
] as const;

type SectionField = (typeof SECTION_FIELDS)[number];

@Injectable()
export class CancersService {
  constructor(
    @InjectRepository(Cancer)
    private readonly repo: Repository<Cancer>,

    @InjectRepository(CancerFaq)
    private readonly faqRepo: Repository<CancerFaq>,

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
      // malformed — ignore
    }
    return [];
  }

  private async saveFaqs(
    manager: any,
    cancerId: number,
    faqs: FaqItemDto[],
  ): Promise<void> {
    await manager.delete(CancerFaq, { cancerId });
    for (let i = 0; i < faqs.length; i++) {
      await manager.save(CancerFaq, {
        cancerId,
        question: faqs[i].question,
        answer: faqs[i].answer,
        sequence: i,
      });
    }
  }

  private async buildResponse(cancerId: number, manager = this.dataSource.manager) {
    const cancer = await manager.findOne(Cancer, { where: { id: cancerId } });
    if (!cancer) return null;

    const faqs = await manager.find(CancerFaq, {
      where: { cancerId },
      order: { sequence: 'ASC' },
    });

    return {
      ...cancer,
      faqs: faqs.map((f) => ({ question: f.question, answer: f.answer })),
    };
  }

  // ─── CREATE ───────────────────────────────────────────────────────────────

  async create(dto: CreateCancerDto, files: any) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const existing = await manager.findOne(Cancer, { where: { slug: dto.slug } });
        if (existing) {
          deleteFiles(files);
          throw new BadRequestException('Slug already exists');
        }

        const coverImageFile = files?.coverImage?.[0]?.filename;

        const cancer = await manager.save(Cancer, {
          slug: dto.slug,
          name: dto.name,
          altText: dto.altText,
          seoTitle: dto.seoTitle,
          metaDescription: dto.metaDescription,
          coverImage: coverImageFile ? `/uploads/${coverImageFile}` : null,
          // Rich-text sections
          overview: dto.overview,
          riskFactors: dto.riskFactors,
          symptoms: dto.symptoms,
          diagnosis: dto.diagnosis,
          treatment: dto.treatment,
          dosAndDonts: dto.dosAndDonts,
        });

        await this.saveFaqs(manager, cancer.id, this.parseFaqs(dto.faqs as any));

        return await this.buildResponse(cancer.id, manager);
      });
    } catch (error) {
      deleteFiles(files);
      throw error;
    }
  }

  // ─── CONTENT IMAGE UPLOAD (inline editor images) ──────────────────────────
  // Handled in controller — no service method needed.

  // ─── FIND ALL ─────────────────────────────────────────────────────────────

  async findAll(isDeleted?: boolean) {
    const filter =
      typeof isDeleted === 'boolean' ? isDeleted : DB_CONSTANTS.IS_DELETED.NO;

    const cancers = await this.repo.find({
      where: { isDeleted: filter },
      order: { createdAt: 'DESC' },
    });

    if (!cancers.length) return [];

    const cancerIds = cancers.map((c) => c.id);

    const faqs = await this.faqRepo.find({
      where: { cancerId: In(cancerIds) },
      order: { sequence: 'ASC' },
    });

    const result = cancers.map((cancer) => ({
      ...cancer,
      faqs: faqs
        .filter((f) => f.cancerId === cancer.id)
        .map((f) => ({ question: f.question, answer: f.answer })),
    }));

    return result;
  }

  // ─── FIND ONE ─────────────────────────────────────────────────────────────

  async findOne(id: number, isDeleted?: boolean) {
    const filter =
      typeof isDeleted === 'boolean' ? isDeleted : DB_CONSTANTS.IS_DELETED.NO;

    const cancer = await this.repo.findOne({ where: { id, isDeleted: filter } });
    if (!cancer) throw new NotFoundException('Cancer not found');

    return await this.buildResponse(cancer.id);
  }

  // ─── FIND BY SLUG ─────────────────────────────────────────────────────────

  async findBySlug(slug: string) {
    const cancer = await this.repo.findOne({
      where: { slug, isDeleted: DB_CONSTANTS.IS_DELETED.NO },
    });
    if (!cancer) throw new NotFoundException('Cancer not found');

    return await this.buildResponse(cancer.id);
  }

  // ─── UPDATE ───────────────────────────────────────────────────────────────

  async update(id: number, dto: UpdateCancerDto, files?: any) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const cancer = await manager.findOne(Cancer, { where: { id, isDeleted: false } });
        if (!cancer) throw new NotFoundException('Cancer not found');

        if (dto.slug && dto.slug !== cancer.slug) {
          const exists = await manager.findOne(Cancer, { where: { slug: dto.slug } });
          if (exists) throw new BadRequestException('Slug already exists');
        }

        if (files?.coverImage?.[0]) {
          cancer.coverImage = `/uploads/${files.coverImage[0].filename}`;
        }

        // Scalar fields
        const scalarFields: Array<keyof Cancer> = [
          'slug', 'name', 'altText', 'seoTitle', 'metaDescription',
        ];
        for (const field of scalarFields) {
          if ((dto as any)[field] !== undefined) {
            (cancer as any)[field] = (dto as any)[field];
          }
        }

        // Rich-text section fields — replace only when provided
        for (const field of SECTION_FIELDS) {
          if ((dto as any)[field] !== undefined) {
            (cancer as any)[field] = (dto as any)[field];
          }
        }

        await manager.save(cancer);

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
    const cancer = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!cancer) throw new NotFoundException('Cancer not found');

    cancer.isDeleted = true;
    await this.repo.save(cancer);

    return [];
  }

  // ─── RESTORE ──────────────────────────────────────────────────────────────

  async restore(id: number) {
    const cancer = await this.repo.findOne({ where: { id, isDeleted: true } });
    if (!cancer) throw new NotFoundException('Cancer not found');

    cancer.isDeleted = false;
    await this.repo.save(cancer);

    return cancer;
  }
}