import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCategory } from './entities/service-category.entity';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateServiceCategoryDto extends PartialType(CreateServiceCategoryDto) {}

@Injectable()
export class ServiceCategoriesService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly repo: Repository<ServiceCategory>,
  ) {}

  async create(dto: CreateServiceCategoryDto): Promise<ServiceCategory> {
    const existing = await this.repo.findOne({ where: { slug: dto.slug } });
    if (existing) throw new BadRequestException('Category slug already exists');

    const category = this.repo.create({
      name: dto.name,
      slug: dto.slug,
      sequence: dto.sequence ?? 0,
    });
    return this.repo.save(category);
  }

  async findAll(): Promise<ServiceCategory[]> {
    return this.repo.find({ order: { sequence: 'ASC', createdAt: 'ASC' } });
  }

  async findOne(id: number): Promise<ServiceCategory> {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Category not found');
    return cat;
  }

  async update(id: number, dto: UpdateServiceCategoryDto): Promise<ServiceCategory> {
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