import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpCode,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { AuthGuard } from '../auth/auth.guard';
import { EnrichmentInterceptor } from '../auth/enrichment.interceptor';
import { RemovePageDto } from './dto/remove-page.dto';
import { GetPageDto } from './dto/get-page.dto';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @UseInterceptors(EnrichmentInterceptor, ClassSerializerInterceptor)
  async create(@Body() createPageDto: CreatePageDto) {
    return await this.pageService.create(createPageDto);
  }

  @Get('byTgId/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(EnrichmentInterceptor, ClassSerializerInterceptor)
  async findAllByTgId(@Param('id') id: number, @Body() getPageDto: GetPageDto) {
    return await this.pageService.findAllByTgId(id, getPageDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: number) {
    return await this.pageService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(EnrichmentInterceptor, ClassSerializerInterceptor)
  update(@Param('id') id: number, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(id, updatePageDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(EnrichmentInterceptor, ClassSerializerInterceptor)
  remove(@Param('id') id: number, @Body() removePageDto: RemovePageDto) {
    return this.pageService.remove(id, removePageDto);
  }
}
