import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Center } from '../centers/entities/center.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Blog } from '../blogs/entities/blog.entity';
import { Cancer } from '../cancers/entities/cancer.entity';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Center)
    private readonly centerRepo: Repository<Center>,

    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,

    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,

    @InjectRepository(Cancer)
    private readonly cancerRepo: Repository<Cancer>,

    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  async getStats() {
    const [centers, doctors, blogs, cancers, services] = await Promise.all([
      this.centerRepo.count({ where: { isDeleted: false } }),
      this.doctorRepo.count({ where: { isDeleted: false } }),
      this.blogRepo.count({ where: { isDeleted: false } }),
      this.cancerRepo.count({ where: { isDeleted: false } }),
      this.serviceRepo.count({ where: { isDeleted: false } }),
    ]);

    return {
      totalCenters: centers,
      totalDoctors: doctors,
      totalBlogs: blogs,
      cancerTypes: cancers,
      services: services,
    };
  }
}