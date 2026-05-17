import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Center } from './entities/center.entity';
import { CentersService } from './centers.service';
import { CentersController } from './centers.controller';

import { Description } from '../../common/entities/description.entity';
import { Image } from '../../common/entities/image.entity';
import { EntityImage } from '../../common/entities/entity-image.entity';
import { EntityDescription } from '../../common/entities/entity-description.entity';

import { Doctor } from '../doctors/entities/doctor.entity';
import { DoctorCentre } from '../doctors/entities/doctor-centre.entity';
import { DoctorLanguage } from '../doctors/entities/doctor-language.entity';
import { DoctorExpertise } from '../doctors/entities/doctor-expertise.entity';
import { DoctorAchievement } from '../doctors/entities/doctor-achievement.entity';
import { DoctorEducation } from '../doctors/entities/doctor-education.entity';
import { DoctorExperience } from '../doctors/entities/doctor-experience.entity';
import { DoctorStory } from '../doctors/entities/doctor-story.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Center,
      Description,
      Image,
      EntityDescription,
      EntityImage,
      Doctor,
      DoctorCentre,
      DoctorLanguage,
      DoctorExpertise,
      DoctorAchievement,
      DoctorEducation,
      DoctorExperience,
      DoctorStory,
    ]),
  ],
  controllers: [CentersController],
  providers: [CentersService],
})
export class CentersModule {}