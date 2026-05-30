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
  UploadedFile,
  Query,
  Req,
} from '@nestjs/common';

import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import type { Request } from 'express';

import { ApiTags, ApiConsumes, ApiBody, ApiQuery, ApiOperation } from '@nestjs/swagger';

import { CancersService } from './cancers.service';
import { CreateCancerDto } from './dto/create-cancer.dto';
import { UpdateCancerDto } from './dto/update-cancer.dto';

// ── Shared multer storage ─────────────────────────────────────────────────────
const multerStorage = diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const uploadPath = join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + extname(file.originalname));
  },
});

const multerOptions = {
  storage: multerStorage,
  limits: { fieldSize: Infinity },
};

@ApiTags('Cancers')
@Controller('cancers')
export class CancersController {
  constructor(private readonly service: CancersService) {}

  private parseBoolean(value: any): boolean | undefined {
    if (value === undefined) return undefined;
    if (Array.isArray(value)) value = value[0];
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return undefined;
  }

  // ── CONTENT IMAGE UPLOAD ─────────────────────────────────────────────────
  // IMPORTANT: Must be declared BEFORE @Post() to avoid route conflicts.
  @Post('upload-content-image')
  @ApiOperation({ summary: 'Upload an inline image for any rich-text tab editor' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadContentImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) return { message: 'No file uploaded', url: null };

    const host = req.headers['x-forwarded-host'] ?? req.headers['host'] ?? '';
    const protocol = req.headers['x-forwarded-proto'] ?? 'http';
    const relativeUrl = `/uploads/${file.filename}`;
    const absoluteUrl = host ? `${protocol}://${host}${relativeUrl}` : relativeUrl;

    return {
      message: 'Image uploaded successfully',
      url: absoluteUrl,
      link: absoluteUrl,
      path: relativeUrl,
    };
  }

  // ── FIND ALL ──────────────────────────────────────────────────────────────
  @Get()
  @ApiQuery({ name: 'isDeleted', required: false, type: Boolean })
  findAll(@Query('isDeleted') isDeleted?: any) {
    return this.service.findAll(this.parseBoolean(isDeleted));
  }

  // ── FIND BY SLUG ──────────────────────────────────────────────────────────
  // IMPORTANT: Must be declared BEFORE @Get(':id') — otherwise NestJS matches
  // the literal string "slug" as the :id param, causing a DB lookup for NaN.
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  // ── RESTORE ────────────────────────────────────────────────────────────────
  // IMPORTANT: Must also be declared before @Put(':id') for the same reason.
  @Put('restore/:id')
  restore(@Param('id') id: string) {
    return this.service.restore(+id);
  }

  // ── CREATE ────────────────────────────────────────────────────────────────
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCancerDto })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'coverImage', maxCount: 1 }], multerOptions),
  )
  create(
    @UploadedFiles() files: { coverImage?: Express.Multer.File[] },
    @Body() dto: CreateCancerDto,
  ) {
    return this.service.create(dto, files);
  }

  // ── FIND ONE ──────────────────────────────────────────────────────────────
  @Get(':id')
  findOne(@Param('id') id: string, @Query('isDeleted') isDeleted?: any) {
    return this.service.findOne(+id, this.parseBoolean(isDeleted));
  }

  // ── UPDATE ────────────────────────────────────────────────────────────────
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCancerDto })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'coverImage', maxCount: 1 }], multerOptions),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles() files: { coverImage?: Express.Multer.File[] },
    @Body() dto: UpdateCancerDto,
  ) {
    return this.service.update(+id, dto, files);
  }

  // ── DELETE ────────────────────────────────────────────────────────────────
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}