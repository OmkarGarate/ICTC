import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

import { Doctor } from './entities/doctor.entity';
import { DoctorCentre } from './entities/doctor-centre.entity';
import { DoctorStory } from './entities/doctor-story.entity';
import { DoctorLanguage } from './entities/doctor-language.entity';
import { DoctorExpertise } from './entities/doctor-expertise.entity';
import { DoctorAchievement } from './entities/doctor-achievement.entity';
import { DoctorEducation } from './entities/doctor-education.entity';
import { DoctorExperience } from './entities/doctor-experience.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Doctor,
      DoctorCentre,
      DoctorStory,
      DoctorLanguage,
      DoctorExpertise,
      DoctorAchievement,
      DoctorEducation,
      DoctorExperience,
    ]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}