import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class FaqItemDto {
  @ApiProperty({ example: 'Is this treatment painful?' })
  @IsString()
  question!: string;

  @ApiProperty({ example: 'No, it is generally painless.' })
  @IsString()
  answer!: string;
}

export class CreateServiceDto {
  @ApiProperty({ example: 'chemotherapy-treatment' })
  @IsString()
  slug!: string;

  @ApiProperty({ example: 'Chemotherapy Treatment' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ example: 'alt text for the cover image' })
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiPropertyOptional({ example: 'Chemotherapy Treatment | ICTC' })
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @ApiPropertyOptional({ example: 'Learn about chemotherapy at ICTC...' })
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiPropertyOptional({ example: '<p>Chemotherapy is...</p>' })
  @IsOptional()
  @IsString()
  content?: string;

  // ✅ Category ID
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number | null;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  coverImage?: any;

  @ApiPropertyOptional({
    type: 'string',
    example: '[{"question":"Is it painful?","answer":"No."}]',
    description: 'JSON string of FAQ array',
  })
  @IsOptional()
  faqs?: FaqItemDto[] | string;
} 