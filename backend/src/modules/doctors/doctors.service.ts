import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';

import { Doctor } from './entities/doctor.entity';
import { DoctorCentre } from './entities/doctor-centre.entity';
import { DoctorStory } from './entities/doctor-story.entity';
import { DoctorLanguage } from './entities/doctor-language.entity';
import { DoctorExpertise } from './entities/doctor-expertise.entity';
import { DoctorAchievement } from './entities/doctor-achievement.entity';
import { DoctorEducation } from './entities/doctor-education.entity';
import { DoctorExperience } from './entities/doctor-experience.entity';

import { CreateDoctorDto, EducationItemDto, ExperienceItemDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

import { DB_CONSTANTS } from '../../common/constants/db.constants';
import { deleteFiles } from '../../common/utils/file.util';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly repo: Repository<Doctor>,

    @InjectRepository(DoctorCentre)
    private readonly centreRepo: Repository<DoctorCentre>,

    @InjectRepository(DoctorStory)
    private readonly storyRepo: Repository<DoctorStory>,

    @InjectRepository(DoctorLanguage)
    private readonly languageRepo: Repository<DoctorLanguage>,

    @InjectRepository(DoctorExpertise)
    private readonly expertiseRepo: Repository<DoctorExpertise>,

    @InjectRepository(DoctorAchievement)
    private readonly achievementRepo: Repository<DoctorAchievement>,

    @InjectRepository(DoctorEducation)
    private readonly educationRepo: Repository<DoctorEducation>,

    @InjectRepository(DoctorExperience)
    private readonly experienceRepo: Repository<DoctorExperience>,

    private readonly dataSource: DataSource,
  ) {}

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /**
   * Parse a string-array field from multipart/form-data.
   *
   * Clients may send the value in three ways:
   *   1. Repeated fields:  -F 'stories=a' -F 'stories=b'   → string[]  (NestJS gives array)
   *   2. JSON string:      -F 'stories=["a","b"]'           → single string starting with '['
   *   3. Plain string:     -F 'stories=a'                   → single string, treat as one-item array
   */
  private parseJsonArray<T>(input: T[] | string | undefined): T[] {
    if (input === undefined || input === null || input === '') return [];

    // Already a real array (repeated multipart fields)
    if (Array.isArray(input)) return input;

    const str = input as string;

    // Looks like a JSON array
    if (str.trimStart().startsWith('[')) {
      try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : [parsed as unknown as T];
      } catch {
        // malformed JSON — fall through to plain-string handling
      }
    }

    // Plain single value — wrap in array
    return [str as unknown as T];
  }

  /**
   * Parse centreIds — may arrive as:
   *   1. Repeated fields:  -F 'centreIds=1' -F 'centreIds=2'  → number[]
   *   2. JSON string:      -F 'centreIds=[1,2]'
   *   3. CSV string:       -F 'centreIds=1,2'
   *   4. Single value:     -F 'centreIds=1'
   */
  private parseCentreIds(input: number[] | string | undefined): number[] {
    if (input === undefined || input === null || input === '') return [];

    if (Array.isArray(input)) return input.map(Number).filter(Boolean);

    const str = input as string;

    if (str.trimStart().startsWith('[')) {
      try {
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed)) return parsed.map(Number).filter(Boolean);
      } catch {
        // fall through
      }
    }

    // CSV or single value
    return str.split(',').map((v) => Number(v.trim())).filter(Boolean);
  }

  /** Build the full doctor response shape by fetching all related rows */
  private async buildResponse(doctorId: number, manager = this.dataSource.manager) {
    const doctor = await manager.findOne(Doctor, { where: { id: doctorId } });
    if (!doctor) return null;

    const centres = await manager.find(DoctorCentre, {
      where: { doctorId },
      order: { id: 'ASC' },
    });

    const stories = await manager.find(DoctorStory, {
      where: { doctorId },
      order: { sequence: 'ASC' },
    });

    const languages = await manager.find(DoctorLanguage, {
      where: { doctorId },
      order: { sequence: 'ASC' },
    });

    const expertise = await manager.find(DoctorExpertise, {
      where: { doctorId },
      order: { sequence: 'ASC' },
    });

    const achievements = await manager.find(DoctorAchievement, {
      where: { doctorId },
      order: { sequence: 'ASC' },
    });

    const education = await manager.find(DoctorEducation, {
      where: { doctorId },
      order: { sequence: 'ASC' },
    });

    const experience = await manager.find(DoctorExperience, {
      where: { doctorId },
      order: { sequence: 'ASC' },
    });

    return {
      ...doctor,
      centreIds: centres.map((c) => c.centreId),
      stories: stories.map((s) => s.url),
      languages: languages.map((l) => l.language),
      expertise: expertise.map((e) => e.item),
      achievements: achievements.map((a) => a.item),
      education: education.map((e) => ({ title: e.title, place: e.place })),
      experience: experience.map((e) => ({ role: e.role, place: e.place })),
    };
  }

  // ─── Internal save helpers (used inside transactions) ────────────────────

  private async saveCentres(manager: any, doctorId: number, centreIds: number[]) {
    await manager.delete(DoctorCentre, { doctorId });
    for (const centreId of centreIds) {
      await manager.save(DoctorCentre, { doctorId, centreId });
    }
  }

  private async saveStories(manager: any, doctorId: number, stories: string[]) {
    await manager.delete(DoctorStory, { doctorId });
    for (let i = 0; i < stories.length; i++) {
      await manager.save(DoctorStory, { doctorId, url: stories[i], sequence: i });
    }
  }

  private async saveLanguages(manager: any, doctorId: number, languages: string[]) {
    await manager.delete(DoctorLanguage, { doctorId });
    for (let i = 0; i < languages.length; i++) {
      await manager.save(DoctorLanguage, { doctorId, language: languages[i], sequence: i });
    }
  }

  private async saveExpertise(manager: any, doctorId: number, expertise: string[]) {
    await manager.delete(DoctorExpertise, { doctorId });
    for (let i = 0; i < expertise.length; i++) {
      await manager.save(DoctorExpertise, { doctorId, item: expertise[i], sequence: i });
    }
  }

  private async saveAchievements(manager: any, doctorId: number, achievements: string[]) {
    await manager.delete(DoctorAchievement, { doctorId });
    for (let i = 0; i < achievements.length; i++) {
      await manager.save(DoctorAchievement, { doctorId, item: achievements[i], sequence: i });
    }
  }

  private async saveEducation(manager: any, doctorId: number, education: EducationItemDto[]) {
    await manager.delete(DoctorEducation, { doctorId });
    for (let i = 0; i < education.length; i++) {
      await manager.save(DoctorEducation, {
        doctorId,
        title: education[i].title,
        place: education[i].place,
        sequence: i,
      });
    }
  }

  private async saveExperience(manager: any, doctorId: number, experience: ExperienceItemDto[]) {
    await manager.delete(DoctorExperience, { doctorId });
    for (let i = 0; i < experience.length; i++) {
      await manager.save(DoctorExperience, {
        doctorId,
        role: experience[i].role,
        place: experience[i].place,
        sequence: i,
      });
    }
  }

  // ─── CREATE ───────────────────────────────────────────────────────────────

  async create(dto: CreateDoctorDto, files: any) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const existing = await manager.findOne(Doctor, { where: { slug: dto.slug } });
        if (existing) {
          deleteFiles(files);
          throw new BadRequestException('Slug already exists');
        }

        const imageFile = files?.image?.[0]?.filename;

        const doctor = await manager.save(Doctor, {
          slug: dto.slug,
          name: dto.name,
          designation: dto.designation,
          qualification: dto.qualification,
          phone: dto.phone,
          rating: dto.rating,
          reviews: dto.reviews,
          summary: dto.summary,
          philosophy: dto.philosophy,
          image: imageFile ? `/uploads/${imageFile}` : null,
        });

        const centreIds = this.parseCentreIds(dto.centreIds);
        const stories = this.parseJsonArray<string>(dto.stories as any);
        const languages = this.parseJsonArray<string>(dto.languages as any);
        const expertise = this.parseJsonArray<string>(dto.expertise as any);
        const achievements = this.parseJsonArray<string>(dto.achievements as any);
        const education = this.parseJsonArray<EducationItemDto>(dto.education as any);
        const experience = this.parseJsonArray<ExperienceItemDto>(dto.experience as any);

        await this.saveCentres(manager, doctor.id, centreIds);
        await this.saveStories(manager, doctor.id, stories);
        await this.saveLanguages(manager, doctor.id, languages);
        await this.saveExpertise(manager, doctor.id, expertise);
        await this.saveAchievements(manager, doctor.id, achievements);
        await this.saveEducation(manager, doctor.id, education);
        await this.saveExperience(manager, doctor.id, experience);

        const result = await this.buildResponse(doctor.id, manager);

        return result;
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

    const doctors = await this.repo.find({
      where: { isDeleted: filter },
      order: { createdAt: 'DESC' },
    });

   if (!doctors.length) {
  return [];
}

    const doctorIds = doctors.map((d) => d.id);

    // Fetch all related rows in bulk
    const [centres, stories, languages, expertise, achievements, education, experience] =
      await Promise.all([
        this.centreRepo.find({ where: { doctorId: In(doctorIds) }, order: { id: 'ASC' } }),
        this.storyRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
        this.languageRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
        this.expertiseRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
        this.achievementRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
        this.educationRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
        this.experienceRepo.find({ where: { doctorId: In(doctorIds) }, order: { sequence: 'ASC' } }),
      ]);

    const result = doctors.map((doctor) => ({
      ...doctor,
      centreIds: centres.filter((c) => c.doctorId === doctor.id).map((c) => c.centreId),
      stories: stories.filter((s) => s.doctorId === doctor.id).map((s) => s.url),
      languages: languages.filter((l) => l.doctorId === doctor.id).map((l) => l.language),
      expertise: expertise.filter((e) => e.doctorId === doctor.id).map((e) => e.item),
      achievements: achievements.filter((a) => a.doctorId === doctor.id).map((a) => a.item),
      education: education
        .filter((e) => e.doctorId === doctor.id)
        .map((e) => ({ title: e.title, place: e.place })),
      experience: experience
        .filter((e) => e.doctorId === doctor.id)
        .map((e) => ({ role: e.role, place: e.place })),
    }));

    return result;
  }

  // ─── FIND ONE ─────────────────────────────────────────────────────────────

  async findOne(id: number, isDeleted?: boolean) {
    const filter =
      typeof isDeleted === 'boolean' ? isDeleted : DB_CONSTANTS.IS_DELETED.NO;

    const doctor = await this.repo.findOne({ where: { id, isDeleted: filter } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const result = await this.buildResponse(doctor.id);

    return result;
  }

  // ─── FIND BY SLUG ─────────────────────────────────────────────────────────

  async findBySlug(slug: string) {
    const doctor = await this.repo.findOne({
      where: { slug, isDeleted: DB_CONSTANTS.IS_DELETED.NO },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const result = await this.buildResponse(doctor.id);

    return result;
  }

  // ─── UPDATE ───────────────────────────────────────────────────────────────

  async update(id: number, dto: UpdateDoctorDto, files?: any) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const doctor = await manager.findOne(Doctor, {
          where: { id, isDeleted: false },
        });
        if (!doctor) throw new NotFoundException('Doctor not found');

        if (dto.slug && dto.slug !== doctor.slug) {
          const exists = await manager.findOne(Doctor, { where: { slug: dto.slug } });
          if (exists) throw new BadRequestException('Slug already exists');
        }

        // Replace image if a new one is provided
        if (files?.image?.[0]) {
          doctor.image = `/uploads/${files.image[0].filename}`;
        }

        // Update scalar fields
        const scalarFields: Array<keyof Doctor> = [
          'slug', 'name', 'designation', 'qualification',
          'phone', 'rating', 'reviews', 'summary', 'philosophy',
        ];
        for (const field of scalarFields) {
          if ((dto as any)[field] !== undefined) {
            (doctor as any)[field] = (dto as any)[field];
          }
        }

        await manager.save(doctor);

        // Replace relational arrays only when provided
        if (dto.centreIds !== undefined) {
          await this.saveCentres(manager, id, this.parseCentreIds(dto.centreIds));
        }
        if (dto.stories !== undefined) {
          await this.saveStories(manager, id, this.parseJsonArray<string>(dto.stories as any));
        }
        if (dto.languages !== undefined) {
          await this.saveLanguages(manager, id, this.parseJsonArray<string>(dto.languages as any));
        }
        if (dto.expertise !== undefined) {
          await this.saveExpertise(manager, id, this.parseJsonArray<string>(dto.expertise as any));
        }
        if (dto.achievements !== undefined) {
          await this.saveAchievements(manager, id, this.parseJsonArray<string>(dto.achievements as any));
        }
        if (dto.education !== undefined) {
          await this.saveEducation(manager, id, this.parseJsonArray<EducationItemDto>(dto.education as any));
        }
        if (dto.experience !== undefined) {
          await this.saveExperience(manager, id, this.parseJsonArray<ExperienceItemDto>(dto.experience as any));
        }

        const result = await this.buildResponse(id, manager);

        return result;
      });
    } catch (error) {
      deleteFiles(files);
      throw error;
    }
  }

  // ─── DELETE (soft) ────────────────────────────────────────────────────────

  async remove(id: number) {
    const doctor = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    doctor.isDeleted = true;
    await this.repo.save(doctor);

    return [];
  }

  // ─── RESTORE ──────────────────────────────────────────────────────────────

  async restore(id: number) {
    const doctor = await this.repo.findOne({ where: { id, isDeleted: true } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    doctor.isDeleted = false;
    await this.repo.save(doctor);

    return doctor;
  }
}