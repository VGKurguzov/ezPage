import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from '../auth/auth.guard';
import { EnrichmentInterceptor } from '../auth/enrichment.interceptor';
import { RemoveItemDto } from './dto/remove-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @UseInterceptors(EnrichmentInterceptor, ClassSerializerInterceptor)
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemService.create(createItemDto);
  }

  @Get('byPageId/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAllByPageId(@Param('id') id: number) {
    return await this.itemService.findAllByPageId(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(EnrichmentInterceptor, ClassSerializerInterceptor)
  async update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(EnrichmentInterceptor, ClassSerializerInterceptor)
  async remove(@Param('id') id: number, @Body() removeItemDto: RemoveItemDto) {
    return await this.itemService.remove(id, removeItemDto);
  }
}
