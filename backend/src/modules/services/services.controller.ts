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

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

// ── Shared multer storage (cover image + content images go to same folder) ────
const multerStorage = diskStorage({
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
});

const multerOptions = {
  storage: multerStorage,
  limits: { fieldSize: Infinity },
};

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  // ── Shared helper ─────────────────────────────────────────────────────────
  private parseBoolean(value: any): boolean | undefined {
    if (value === undefined) return undefined;
    if (Array.isArray(value)) value = value[0];
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return undefined;
  }

  // ── CONTENT IMAGE UPLOAD ──────────────────────────────────────────────────
  /**
   * Dedicated endpoint for the rich-text editor to upload inline images.
   *
   * The editor (TipTap, Quill, CKEditor, etc.) calls this via its image plugin,
   * receives the URL, and inserts <img src="<url>"> into the HTML content.
   *
   * POST /services/upload-content-image
   * Content-Type: multipart/form-data
   * Field name: "file"
   *
   * Response: { url: "/uploads/filename.jpg" }
   */
  @Post('upload-content-image')
  @ApiOperation({ summary: 'Upload an inline image for the rich-text editor' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadContentImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      return { message: 'No file uploaded', url: null };
    }

    // Build an absolute URL the editor can use as <img src="...">
    // Falls back to relative path if host header is unavailable.
    const host = req.headers['x-forwarded-host'] ?? req.headers['host'] ?? '';
    const protocol = req.headers['x-forwarded-proto'] ?? 'http';

    const relativeUrl = `/uploads/${file.filename}`;
    const absoluteUrl = host ? `${protocol}://${host}${relativeUrl}` : relativeUrl;

    return {
      message: 'Image uploaded successfully',
      // "url" -> used by most editors (TipTap, Quill image-uploader, etc.)
      url: absoluteUrl,
      // "link" -> used by some CKEditor configurations
      link: absoluteUrl,
      // relative path -- useful for storing in DB
      path: relativeUrl,
    };
  }

  // ── CREATE ────────────────────────────────────────────────────────────────
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateServiceDto })
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'coverImage', maxCount: 1 }],
      multerOptions,
    ),
  )
  create(
    @UploadedFiles() files: { coverImage?: Express.Multer.File[] },
    @Body() dto: CreateServiceDto,
  ) {
    return this.service.create(dto, files);
  }

  // ── FIND ALL ──────────────────────────────────────────────────────────────
  @Get()
  @ApiQuery({ name: 'isDeleted', required: false, type: Boolean })
  findAll(@Query('isDeleted') isDeleted?: any) {
    return this.service.findAll(this.parseBoolean(isDeleted));
  }

  // ── FIND ONE ──────────────────────────────────────────────────────────────
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('isDeleted') isDeleted?: any,
  ) {
    return this.service.findOne(+id, this.parseBoolean(isDeleted));
  }

  // ── FIND BY SLUG ──────────────────────────────────────────────────────────
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  // ── UPDATE ────────────────────────────────────────────────────────────────
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateServiceDto })
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'coverImage', maxCount: 1 }],
      multerOptions,
    ),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles() files: { coverImage?: Express.Multer.File[] },
    @Body() dto: UpdateServiceDto,
  ) {
    return this.service.update(+id, dto, files);
  }

  // ── DELETE ────────────────────────────────────────────────────────────────
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  // ── RESTORE ───────────────────────────────────────────────────────────────
  @Put('restore/:id')
  restore(@Param('id') id: string) {
    return this.service.restore(+id);
  }
}