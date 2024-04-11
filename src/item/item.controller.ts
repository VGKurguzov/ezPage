import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get('byPageId/:id')
  findAllByPageId(@Param('id') id: number) {
    return this.itemService.findAllByPageId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemService.remove(id);
  }
}
