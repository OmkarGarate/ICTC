  import { ApiProperty } from '@nestjs/swagger';
  import {
    IsOptional,
    IsString,
    IsNumber,
    IsArray,
  } from 'class-validator';
  import { Transform, Type } from 'class-transformer';

  export class CreateCenterDto {

    @ApiProperty() 
    @IsString()
    slug!: string;

    @ApiProperty() 
    @IsString()
    name!: string;

    @ApiProperty() 
    @IsString()
    fullName!: string;

    @ApiProperty({ required: false }) 
    @IsOptional() 
    @IsString()
    phone?: string;

    @ApiProperty({ required: false }) 
    @IsOptional() 
    @IsString()
    rating?: string;

    @ApiProperty({ required: false }) 
    @IsOptional() 
    @IsString()
    reviews?: string;

    @ApiProperty({ required: false }) 
    @IsOptional() 
    @IsString()
    timing?: string;

    @ApiProperty({ required: false }) 
    @IsOptional() 
    @Type(() => Number)
    @IsNumber()
    lat?: number;

    @ApiProperty({ required: false }) 
    @IsOptional() 
    @Type(() => Number)
    @IsNumber()
    lng?: number;

    @ApiProperty({ required: false }) 
    @IsOptional() 
    @IsString()
    mapQuery?: string;

    @ApiProperty({ required: false }) 
    @IsOptional() 
    @IsString()
    mapEmbed?: string;

    @ApiProperty({ required: false }) 
    @IsOptional() 
    @IsString()
    address?: string;

    @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @Transform(({ value }) => {
    // 🔥 handle swagger string OR array
    if (Array.isArray(value)) return value;

    if (typeof value === 'string') {
      return value.split(',').map((v) => v.trim());
    }

    return [];
  })
  description?: string[];

    // ⚠️ These are FILES (handled via multer, not body)
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    heroImage?: any;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    centerImage?: any;

    @ApiProperty({
      type: 'array',
      items: { type: 'string', format: 'binary' },
      required: false,
    })
    gallery?: any[];
  }