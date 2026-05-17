import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class FaqItemDto {
  @ApiProperty({ example: 'Is breast cancer curable?' })
  @IsString()
  question!: string;

  @ApiProperty({ example: 'Yes, especially when detected early.' })
  @IsString()
  answer!: string;
}

export class CreateCancerDto {
  @ApiProperty({ example: 'breast-cancer' })
  @IsString()
  slug!: string;

  @ApiProperty({ example: 'Breast Cancer' })
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  metaDescription?: string;

  // ── Rich-text tab sections ──────────────────────────────────────────────

  @ApiPropertyOptional({ description: 'HTML from Overview tab' })
  @IsOptional()
  @IsString()
  overview?: string;

  @ApiPropertyOptional({ description: 'HTML from Risk Factors tab' })
  @IsOptional()
  @IsString()
  riskFactors?: string;

  @ApiPropertyOptional({ description: 'HTML from Symptoms tab' })
  @IsOptional()
  @IsString()
  symptoms?: string;

  @ApiPropertyOptional({ description: 'HTML from Diagnosis tab' })
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @ApiPropertyOptional({ description: 'HTML from Treatment tab' })
  @IsOptional()
  @IsString()
  treatment?: string;

  @ApiPropertyOptional({ description: "HTML from Do's & Don'ts tab" })
  @IsOptional()
  @IsString()
  dosAndDonts?: string;

  // ── Cover image (multipart) ─────────────────────────────────────────────

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  coverImage?: any;

  // ── FAQs — JSON string from multipart ──────────────────────────────────

  @ApiPropertyOptional({
    type: 'string',
    example: '[{"question":"Is it curable?","answer":"Yes."}]',
    description: 'JSON string of FAQ array',
  })
  @IsOptional()
  faqs?: FaqItemDto[] | string;
}