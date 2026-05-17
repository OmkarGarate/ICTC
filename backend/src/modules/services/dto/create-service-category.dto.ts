import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServiceCategoryDto {
  @ApiProperty({ example: 'Treatment Modalities' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'treatment-modalities' })
  @IsString()
  slug!: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sequence?: number;
}