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

import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

import { CentersService } from './centers.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';

// ─── shared multer storage config ────────────────────────────────────────────
const multerStorage = diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + extname(file.originalname));
  },
});

// ─── helper: bucket AnyFiles result into named groups ────────────────────────
function groupFiles(files: Express.Multer.File[]) {
  const heroImage: Express.Multer.File[] = [];
  const centerImage: Express.Multer.File[] = [];
  const gallery: Express.Multer.File[] = [];

  for (const f of files || []) {
    if (f.fieldname === 'heroImage') heroImage.push(f);
    else if (f.fieldname === 'centerImage') centerImage.push(f);
    else if (f.fieldname === 'gallery') gallery.push(f);
  }

  return { heroImage, centerImage, gallery };
}

@ApiTags('Centers')
@Controller('centers')
export class CentersController {
  constructor(private readonly service: CentersService) {}

  private parseBoolean(value: any): boolean | undefined {
    if (value === undefined) return undefined;
    if (Array.isArray(value)) value = value[0];
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return undefined;
  }

  // ✅ CREATE
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCenterDto })
  @UseInterceptors(AnyFilesInterceptor({ storage: multerStorage, limits: { fileSize: 10 * 1024 * 1024, fieldSize: Infinity } }))
  create(
    @UploadedFiles() rawFiles: Express.Multer.File[],
    @Body() dto: CreateCenterDto,
  ) {
    return this.service.create(dto, groupFiles(rawFiles));
  }

  // ✅ FIND ALL
  @Get()
  @ApiQuery({ name: 'isDeleted', required: false, type: Boolean })
  findAll(@Query('isDeleted') isDeleted?: any) {
    return this.service.findAll(this.parseBoolean(isDeleted));
  }

  // ✅ FIND ONE
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('isDeleted') isDeleted?: any,
  ) {
    return this.service.findOne(+id, this.parseBoolean(isDeleted));
  }

  // ✅ RESTORE — must be before PUT(':id') to avoid route conflict
  @Put('restore/:id')
  restore(@Param('id') id: string) {
    return this.service.restore(+id);
  }

  // ✅ UPDATE
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCenterDto })
  @UseInterceptors(AnyFilesInterceptor({ storage: multerStorage, limits: { fileSize: 10 * 1024 * 1024, fieldSize: Infinity } }))
  update(
    @Param('id') id: string,
    @UploadedFiles() rawFiles: Express.Multer.File[],
    @Body() dto: UpdateCenterDto,
  ) {
    return this.service.update(+id, dto, groupFiles(rawFiles));
  }

  // ✅ DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
} 