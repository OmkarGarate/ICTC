import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CancersController } from './cancers.controller';
import { CancersService } from './cancers.service';

import { Cancer } from './entities/cancer.entity';
import { CancerFaq } from './entities/cancer-faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cancer, CancerFaq])],
  controllers: [CancersController],
  providers: [CancersService],
  exports: [CancersService],
})
export class CancersModule {}