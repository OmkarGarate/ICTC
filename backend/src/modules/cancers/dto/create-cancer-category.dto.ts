import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCancerCategoryDto {
  @ApiProperty({ example: 'Gynaecological Cancers' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'gynaecological-cancers' })
  @IsString()
  slug!: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  sequence?: number;
}