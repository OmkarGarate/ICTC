import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CancerCategory } from './entities/cancer-category';
import { CreateCancerCategoryDto } from './dto/create-cancer-category.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCancerCategoryDto extends PartialType(CreateCancerCategoryDto) {}

@Injectable()
export class CancerCategoriesService {
  constructor(
    @InjectRepository(CancerCategory)
    private readonly repo: Repository<CancerCategory>,
  ) {}

  async create(dto: CreateCancerCategoryDto): Promise<CancerCategory> {
    const existing = await this.repo.findOne({ where: { slug: dto.slug } });
    if (existing) throw new BadRequestException('Category slug already exists');

    const category = this.repo.create({
      name: dto.name,
      slug: dto.slug,
      sequence: dto.sequence ?? 0,
    });
    return this.repo.save(category);
  }

  async findAll(): Promise<CancerCategory[]> {
    return this.repo.find({ order: { sequence: 'ASC', createdAt: 'ASC' } });
  }

  async findOne(id: number): Promise<CancerCategory> {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Category not found');
    return cat;
  }

  async update(id: number, dto: UpdateCancerCategoryDto): Promise<CancerCategory> {
    const cat = await this.findOne(id);

    if (dto.slug && dto.slug !== cat.slug) {
      const exists = await this.repo.findOne({ where: { slug: dto.slug } });
      if (exists) throw new BadRequestException('Category slug already exists');
    }

    Object.assign(cat, dto);
    return this.repo.save(cat);
  }

  async remove(id: number): Promise<void> {
    const cat = await this.findOne(id);
    await this.repo.remove(cat);
  }
}