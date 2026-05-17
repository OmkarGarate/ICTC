import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';

export class EducationItemDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  place?: string;
}

export class ExperienceItemDto {
  @ApiProperty()
  @IsString()
  role!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  place?: string;
}

export class CreateDoctorDto {
  @ApiProperty()
  @IsString()
  slug!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  qualification?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rating?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reviews?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  philosophy?: string;

  // ✅ Doctor photo uploaded separately via multipart
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  image?: any;

  // ✅ Arrays of strings — sent as JSON string from form-data
  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  centreIds?: number[] | string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  stories?: string[] | string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  languages?: string[] | string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  expertise?: string[] | string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  achievements?: string[] | string;

  // ✅ Arrays of objects — sent as JSON string
  @ApiPropertyOptional({ type: [EducationItemDto] })
  @IsOptional()
  education?: EducationItemDto[] | string;

  @ApiPropertyOptional({ type: [ExperienceItemDto] })
  @IsOptional()
  experience?: ExperienceItemDto[] | string;
}