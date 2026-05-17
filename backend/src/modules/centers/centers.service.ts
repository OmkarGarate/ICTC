import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';

import { Center } from './entities/center.entity';
import { Description } from '../../common/entities/description.entity';
import { Image } from '../../common/entities/image.entity';
import { EntityDescription } from '../../common/entities/entity-description.entity';
import { EntityImage } from '../../common/entities/entity-image.entity';

import { Doctor } from '../doctors/entities/doctor.entity';
import { DoctorCentre } from '../doctors/entities/doctor-centre.entity';
import { DoctorLanguage } from '../doctors/entities/doctor-language.entity';
import { DoctorExpertise } from '../doctors/entities/doctor-expertise.entity';
import { DoctorAchievement } from '../doctors/entities/doctor-achievement.entity';
import { DoctorEducation } from '../doctors/entities/doctor-education.entity';
import { DoctorExperience } from '../doctors/entities/doctor-experience.entity';
import { DoctorStory } from '../doctors/entities/doctor-story.entity';

import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';

import { DB_CONSTANTS } from '../../common/constants/db.constants';
import { deleteFiles } from '../../common/utils/file.util';

@Injectable()
export class CentersService {
  private ENTITY = 'center';

  constructor(
    @InjectRepository(Center)
    private readonly repo: Repository<Center>,

    @InjectRepository(Description)
    private readonly descRepo: Repository<Description>,

    @InjectRepository(EntityDescription)
    private readonly entityDescRepo: Repository<EntityDescription>,

    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,

    @InjectRepository(EntityImage)
    private readonly entityImageRepo: Repository<EntityImage>,

    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,

    @InjectRepository(DoctorCentre)
    private readonly doctorCentreRepo: Repository<DoctorCentre>,

    @InjectRepository(DoctorLanguage)
    private readonly doctorLanguageRepo: Repository<DoctorLanguage>,

    @InjectRepository(DoctorExpertise)
    private readonly doctorExpertiseRepo: Repository<DoctorExpertise>,

    @InjectRepository(DoctorAchievement)
    private readonly doctorAchievementRepo: Repository<DoctorAchievement>,

    @InjectRepository(DoctorEducation)
    private readonly doctorEducationRepo: Repository<DoctorEducation>,

    @InjectRepository(DoctorExperience)
    private readonly doctorExperienceRepo: Repository<DoctorExperience>,

    @InjectRepository(DoctorStory)
    private readonly doctorStoryRepo: Repository<DoctorStory>,

    private readonly dataSource: DataSource,
  ) {}

  // ─── Private: enrich doctor base rows with all sub-entity data ────────────

  private async enrichDoctors(doctors: Doctor[]) {
    if (!doctors.length) return [];

    const doctorIds = doctors.map((d) => d.id);

    const [centres, languages, expertise, achievements, education, experience, stories] =
      await Promise.all([
        this.doctorCentreRepo.find({ where: { doctorId: In(doctorIds) }, order: { id: 'ASC' } }),
        this.doctorLanguageRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
        this.doctorExpertiseRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
        this.doctorAchievementRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
        this.doctorEducationRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
        this.doctorExperienceRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
        this.doctorStoryRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
      ]);

    return doctors.map((doctor) => ({
      ...doctor,
      centreIds: centres.filter((c) => c.doctorId === doctor.id).map((c) => c.centreId),
      languages: languages.filter((l) => l.doctorId === doctor.id).map((l) => l.language),
      expertise: expertise.filter((e) => e.doctorId === doctor.id).map((e) => e.item),
      achievements: achievements.filter((a) => a.doctorId === doctor.id).map((a) => a.item),
      education: education
        .filter((e) => e.doctorId === doctor.id)
        .map((e) => ({ title: e.title, place: e.place })),
      experience: experience
        .filter((e) => e.doctorId === doctor.id)
        .map((e) => ({ role: e.role, place: e.place })),
      stories: stories.filter((s) => s.doctorId === doctor.id).map((s) => s.url),
    }));
  }

  private normalizeDescription(input: any): string[] {
    if (!input) return [];
    if (Array.isArray(input)) return input;
    if (typeof input === 'string') return [input];
    return [];
  }

  // ✅ CREATE
  async create(dto: CreateCenterDto, files: any) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const existing = await manager.findOne(Center, {
          where: { slug: dto.slug },
        });

        if (existing) {
          deleteFiles(files);
          throw new BadRequestException('Slug already exists');
        }

        const heroImage = files?.heroImage?.[0]?.filename;
        const centerImage = files?.centerImage?.[0]?.filename;

        const center = await manager.save(Center, {
          ...dto,
          heroImage: heroImage ? `/uploads/${heroImage}` : null,
          centerImage: centerImage ? `/uploads/${centerImage}` : null,
        });

        // 🔥 DESCRIPTIONS
        const descArray = this.normalizeDescription(dto.description);

        let dIndex = 0;
        for (const text of descArray) {
          const desc = await manager.save(Description, { content: text });

          await manager.save(EntityDescription, {
            entityId: center.id,
            entityType: this.ENTITY,
            descriptionId: desc.id,
            sequence: dIndex++,
          });
        }

        // 🔥 GALLERY
        let gIndex = 0;
        for (const file of files?.gallery || []) {
          const image = await manager.save(Image, {
            url: `/uploads/${file.filename}`,
          });

          await manager.save(EntityImage, {
            entityId: center.id,
            entityType: this.ENTITY,
            imageId: image.id,
            sequence: gIndex++,
          });
        }

        // 🔥 FETCH USING SAME MANAGER
        const descTxn = await manager.find(EntityDescription, {
          where: { entityId: center.id, entityType: this.ENTITY },
          order: { sequence: 'ASC' },
        });

        const descIds = descTxn.map((d) => d.descriptionId);
        const descriptions = descIds.length
          ? await manager.findBy(Description, { id: In(descIds) })
          : [];

        const imgTxn = await manager.find(EntityImage, {
          where: { entityId: center.id, entityType: this.ENTITY },
          order: { sequence: 'ASC' },
        });

        const imgIds = imgTxn.map((i) => i.imageId);
        const images = imgIds.length
          ? await manager.findBy(Image, { id: In(imgIds) })
          : [];

        return {
          ...center,
          description: descriptions.map((d) => d.content),
          gallery: images.map((i) => i.url),
          doctors: [],
        };
      });
    } catch (error) {
      deleteFiles(files);
      throw error;
    }
  }

  // ✅ FIND ALL (with embedded doctors)
  async findAll(isDeleted?: boolean) {
    const filter =
      typeof isDeleted === 'boolean'
        ? isDeleted
        : DB_CONSTANTS.IS_DELETED.NO;

    const centers = await this.repo.find({
      where: { isDeleted: filter },
      order: { createdAt: 'DESC' },
    });

    if (!centers.length) return [];

    const centerIds = centers.map((c) => c.id);

    // 🔥 descriptions, images, doctor-centres — all in one parallel round-trip
    const [descTxn, imgTxn, doctorCentres] = await Promise.all([
      this.entityDescRepo.find({
        where: { entityId: In(centerIds), entityType: this.ENTITY },
        order: { sequence: 'ASC' },
      }),
      this.entityImageRepo.find({
        where: { entityId: In(centerIds), entityType: this.ENTITY },
        order: { sequence: 'ASC' },
      }),
      this.doctorCentreRepo.find({
        where: { centreId: In(centerIds) },
        order: { id: 'ASC' },
      }),
    ]);

    // descriptions
    const descIds = descTxn.map((d) => d.descriptionId);
    const descriptions = descIds.length
      ? await this.descRepo.findBy({ id: In(descIds) })
      : [];

    const descMap = new Map<number, string[]>();
    descTxn.forEach((txn) => {
      const desc = descriptions.find((d) => d.id === txn.descriptionId);
      if (!desc) return;
      if (!descMap.has(txn.entityId)) descMap.set(txn.entityId, []);
      descMap.get(txn.entityId)!.push(desc.content);
    });

    // images
    const imgIds = imgTxn.map((i) => i.imageId);
    const images = imgIds.length
      ? await this.imageRepo.findBy({ id: In(imgIds) })
      : [];

    const imgMap = new Map<number, string[]>();
    imgTxn.forEach((txn) => {
      const img = images.find((i) => i.id === txn.imageId);
      if (!img) return;
      if (!imgMap.has(txn.entityId)) imgMap.set(txn.entityId, []);
      imgMap.get(txn.entityId)!.push(img.url);
    });

    // doctors — fetch all data including sub-entities
    const doctorIds = [...new Set(doctorCentres.map((dc) => dc.doctorId))];
    const doctorBase = doctorIds.length
      ? await this.doctorRepo.find({
          where: { id: In(doctorIds), isDeleted: false },
        })
      : [];
    const enrichedDoctors = await this.enrichDoctors(doctorBase);

    // centreId → enriched Doctor[]
    const doctorMap = new Map<number, typeof enrichedDoctors>();
    doctorCentres.forEach((dc) => {
      const doc = enrichedDoctors.find((d) => d.id === dc.doctorId);
      if (!doc) return;
      if (!doctorMap.has(dc.centreId)) doctorMap.set(dc.centreId, []);
      doctorMap.get(dc.centreId)!.push(doc);
    });

    return centers.map((center) => ({
      ...center,
      description: descMap.get(center.id) || [],
      gallery: imgMap.get(center.id) || [],
      doctors: doctorMap.get(center.id) || [],
    }));
  }

  // ✅ FIND ONE (with embedded doctors)
  async findOne(id: number, isDeleted?: boolean) {
    const filter =
      typeof isDeleted === 'boolean'
        ? isDeleted
        : DB_CONSTANTS.IS_DELETED.NO;

    const center = await this.repo.findOne({ where: { id, isDeleted: filter } });
    if (!center) throw new NotFoundException('Center not found');

    const [descTxn, imgTxn, doctorCentres] = await Promise.all([
      this.entityDescRepo.find({
        where: { entityId: id, entityType: this.ENTITY },
        order: { sequence: 'ASC' },
      }),
      this.entityImageRepo.find({
        where: { entityId: id, entityType: this.ENTITY },
        order: { sequence: 'ASC' },
      }),
      this.doctorCentreRepo.find({
        where: { centreId: id },
        order: { id: 'ASC' },
      }),
    ]);

    const descIds = descTxn.map((d) => d.descriptionId);
    const descriptions = descIds.length
      ? await this.descRepo.findBy({ id: In(descIds) })
      : [];

    const imgIds = imgTxn.map((i) => i.imageId);
    const images = imgIds.length
      ? await this.imageRepo.findBy({ id: In(imgIds) })
      : [];

    const doctorIds = doctorCentres.map((dc) => dc.doctorId);
    const doctorBase = doctorIds.length
      ? await this.doctorRepo.find({
          where: { id: In(doctorIds), isDeleted: false },
        })
      : [];
    const doctors = await this.enrichDoctors(doctorBase);

    return {
      ...center,
      description: descriptions.map((d) => d.content),
      gallery: images.map((i) => i.url),
      doctors,
    };
  }

  // ✅ UPDATE
  async update(id: number, dto: UpdateCenterDto, files?: any) {
    return await this.dataSource.transaction(async (manager) => {
      const center = await manager.findOne(Center, {
        where: { id, isDeleted: false },
      });

      if (!center) throw new NotFoundException('Center not found');

      if (dto.slug && dto.slug !== center.slug) {
        const exists = await manager.findOne(Center, {
          where: { slug: dto.slug },
        });

        if (exists) {
          throw new BadRequestException('Slug already exists');
        }
      }

      // replace descriptions
      if (dto.description !== undefined) {
        const txn = await manager.find(EntityDescription, {
          where: { entityId: id, entityType: this.ENTITY },
        });

        const descIds = txn.map((t) => t.descriptionId);

        await manager.delete(EntityDescription, {
          entityId: id,
          entityType: this.ENTITY,
        });

        if (descIds.length) {
  await manager.delete(Description, { id: In(descIds) });
}
        const descArray = this.normalizeDescription(dto.description);

        let index = 0;
        for (const text of descArray) {
          const desc = await manager.save(Description, { content: text });

          await manager.save(EntityDescription, {
            entityId: id,
            entityType: this.ENTITY,
            descriptionId: desc.id,
            sequence: index++,
          });
        }
      }

      // update gallery — merge kept existing images with any new uploads
      // The frontend sends:
      //   • existingGallery[]  — server-relative URLs of images the user chose to keep
      //   • files.gallery[]    — newly uploaded files
      // We always run this block so that removing an image (with no new upload) is also persisted.
      {
        // Normalise existingGallery to a string[] (multer body can give string or string[])
        const rawExisting = (dto as any).existingGallery;
        const keptUrls: string[] = rawExisting
          ? Array.isArray(rawExisting) ? rawExisting : [rawExisting]
          : [];

        const newFiles: any[] = files?.gallery ?? [];

        // Fetch current DB state for this center's gallery
        const txn = await manager.find(EntityImage, {
          where: { entityId: id, entityType: this.ENTITY },
        });
        const imageIds = txn.map((t) => t.imageId);
        const currentImages = imageIds.length
          ? await manager.findBy(Image, { id: In(imageIds) })
          : [];

        // Determine which existing DB images are no longer kept → delete them
        const imagesToDelete = currentImages.filter(
          (img) => !keptUrls.includes(img.url),
        );

        if (imagesToDelete.length) {
          const deleteIds = imagesToDelete.map((img) => img.id);

          // Remove junction rows for deleted images
          await manager.delete(EntityImage, {
            entityId: id,
            entityType: this.ENTITY,
            imageId: In(deleteIds),
          });

          // Delete physical files
          imagesToDelete.forEach((img) => {
            const filename = img.url.replace('/uploads/', '');
            deleteFiles({ gallery: [{ filename }] });
          });

          await manager.delete(Image, { id: In(deleteIds) });
        }

        // Re-sequence all junction rows for kept images in the order the frontend sent them
        // First, wipe existing junction rows for kept images so we can re-insert with new sequence
        const keptImages = currentImages.filter((img) =>
          keptUrls.includes(img.url),
        );

        if (keptImages.length) {
          await manager.delete(EntityImage, {
            entityId: id,
            entityType: this.ENTITY,
            imageId: In(keptImages.map((i) => i.id)),
          });
        }

        let sequence = 0;

        // Insert kept images in the order the frontend provided
        for (const url of keptUrls) {
          const img = keptImages.find((i) => i.url === url);
          if (!img) continue; // safety: skip if somehow not found

          await manager.save(EntityImage, {
            entityId: id,
            entityType: this.ENTITY,
            imageId: img.id,
            sequence: sequence++,
          });
        }

        // Insert newly uploaded images after the kept ones
        for (const file of newFiles) {
          const image = await manager.save(Image, {
            url: `/uploads/${file.filename}`,
          });

          await manager.save(EntityImage, {
            entityId: id,
            entityType: this.ENTITY,
            imageId: image.id,
            sequence: sequence++,
          });
        }
      }

      Object.assign(center, dto);
      await manager.save(center);

      return await this.findOne(id);
    });
  }

  // ✅ DELETE
  async remove(id: number) {
    const center = await this.repo.findOne({
      where: { id, isDeleted: false },
    });

    if (!center) throw new NotFoundException('Center not found');

    center.isDeleted = true;
    await this.repo.save(center);

    return [];
  }

  // ✅ RESTORE
  async restore(id: number) {
    const center = await this.repo.findOne({
      where: { id, isDeleted: true },
    });

    if (!center) throw new NotFoundException('Center not found');

    center.isDeleted = false;
    await this.repo.save(center);

    return center;
  }
}