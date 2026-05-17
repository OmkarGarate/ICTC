import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { Center } from '../centers/entities/center.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Blog } from '../blogs/entities/blog.entity';
import { Cancer } from '../cancers/entities/cancer.entity';
import { Service } from '../services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Center, Doctor, Blog, Cancer, Service]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}