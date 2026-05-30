import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CancerCategoriesService,
  UpdateCancerCategoryDto,
} from './cancer-categories.service';
import { CreateCancerCategoryDto } from './dto/create-cancer-category.dto';

@ApiTags('Cancer Categories')
@Controller('cancer-categories')
export class CancerCategoriesController {
  constructor(private readonly service: CancerCategoriesService) {}

  @Post()
  create(@Body() dto: CreateCancerCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCancerCategoryDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}