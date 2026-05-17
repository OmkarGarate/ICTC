import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

import { ServiceCategoriesController } from './service-categories.controller';
import { ServiceCategoriesService } from './service-categories.service';

import { Service } from './entities/service.entity';
import { ServiceFaq } from './entities/service-faq.entity';
import { ServiceCategory } from './entities/service-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, ServiceFaq, ServiceCategory]),
  ],
  controllers: [ServicesController, ServiceCategoriesController],
  providers: [ServicesService, ServiceCategoriesService],
  exports: [ServicesService, ServiceCategoriesService],
})
export class ServicesModule {}