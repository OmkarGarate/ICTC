import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

import { ApiTags, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';

import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

// ── Multer config (shared) ────────────────────────────────────────────────────
const multerOptions = {
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + extname(file.originalname));
    },
    
  }),

  limits: { fieldSize: Infinity },
};

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly service: DoctorsService) {}

  // ── Shared helper ────────────────────────────────────────────────────────
  private parseBoolean(value: any): boolean | undefined {
    if (value === undefined) return undefined;
    if (Array.isArray(value)) value = value[0];
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return undefined;
  }

  // ── CREATE ───────────────────────────────────────────────────────────────
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateDoctorDto })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], multerOptions),
  )
  create(
    @UploadedFiles() files: { image?: Express.Multer.File[] },
    @Body() dto: CreateDoctorDto,
  ) {
    return this.service.create(dto, files);
  }

  // ── FIND ALL ─────────────────────────────────────────────────────────────
  @Get()
  @ApiQuery({ name: 'isDeleted', required: false, type: Boolean })
  findAll(@Query('isDeleted') isDeleted?: any) {
    return this.service.findAll(this.parseBoolean(isDeleted));
  }

  // ── FIND ONE ─────────────────────────────────────────────────────────────
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('isDeleted') isDeleted?: any,
  ) {
    return this.service.findOne(+id, this.parseBoolean(isDeleted));
  }

  // ── FIND BY SLUG ─────────────────────────────────────────────────────────
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  // ── RESTORE — must be before PUT(':id') to avoid route conflict ──────────
  @Put('restore/:id')
  restore(@Param('id') id: string) {
    return this.service.restore(+id);
  }

  // ── UPDATE ───────────────────────────────────────────────────────────────
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateDoctorDto })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], multerOptions),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles() files: { image?: Express.Multer.File[] },
    @Body() dto: UpdateDoctorDto,
  ) {
    return this.service.update(+id, dto, files);
  }

  // ── DELETE ───────────────────────────────────────────────────────────────
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}