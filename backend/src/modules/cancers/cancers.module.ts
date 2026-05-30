import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CancersController } from './cancers.controller';
import { CancersService } from './cancers.service';

import { CancerCategoriesController } from './cancer-categories.controller';
import { CancerCategoriesService } from './cancer-categories.service';

import { Cancer } from './entities/cancer.entity';
import { CancerFaq } from './entities/cancer-faq.entity';
import { CancerCategory } from './entities/cancer-category';

@Module({
  imports: [TypeOrmModule.forFeature([Cancer, CancerFaq, CancerCategory])],
  controllers: [CancersController, CancerCategoriesController],
  providers: [CancersService, CancerCategoriesService],
  exports: [CancersService, CancerCategoriesService],
})
export class CancersModule {}