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
  ParseIntPipe,
  DefaultValuePipe,
  Req,
} from '@nestjs/common';

import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import type { Request } from 'express';

import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';

import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

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

const multerOptions = { storage: multerStorage, limits: { fieldSize: Infinity } };

function groupFiles(files: Express.Multer.File[]) {
  const image: Express.Multer.File[] = [];
  const contentImages: Express.Multer.File[] = [];

  for (const f of files || []) {
    if (f.fieldname === 'image') image.push(f);
    if (f.fieldname === 'contentImages') contentImages.push(f);
  }

  return { image, contentImages };
}

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {

  constructor(private readonly service: BlogsService) {}

  private parseBoolean(value: any): boolean | undefined {
    if (value === undefined) return undefined;
    if (Array.isArray(value)) value = value[0];
    if (value === 'true'  || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return undefined;
  }

  // ── CONTENT IMAGE UPLOAD ──────────────────────────────────────────────────
  // Must be declared BEFORE @Post() to avoid route conflicts.
  @Post('upload-content-image')
  @ApiOperation({ summary: 'Upload an inline image for the blog rich-text editor' })
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

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateBlogDto })
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  create(
    @UploadedFiles() rawFiles: Express.Multer.File[],
    @Body() dto: CreateBlogDto,
  ) {
    return this.service.create(dto, groupFiles(rawFiles));
  }

  @Get()
  @ApiQuery({ name: 'isDeleted', required: false, type: Boolean })
  findAll(@Query('isDeleted') isDeleted?: any) {
    return this.service.findAll(this.parseBoolean(isDeleted));
  }

  /**
   * GET /blogs/categories
   * ⚠️ Must be declared BEFORE :id and slug/:slug to avoid route conflicts.
   */
  @Get('categories')
  findCategories() {
    return this.service.findCategories();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  /**
   * GET /blogs/:id/similar?limit=3
   * ⚠️ Must be declared BEFORE the plain :id route.
   */
  @Get(':id/similar')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findSimilar(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number,
  ) {
    return this.service.findSimilar(id, limit);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('isDeleted') isDeleted?: any,
  ) {
    return this.service.findOne(+id, this.parseBoolean(isDeleted));
  }

  @Put('restore/:id')
  restore(@Param('id') id: string) {
    return this.service.restore(+id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateBlogDto })
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  update(
    @Param('id') id: string,
    @UploadedFiles() rawFiles: Express.Multer.File[],
    @Body() dto: UpdateBlogDto,
  ) {
    return this.service.update(+id, dto, groupFiles(rawFiles));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}