import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto) {
    const item = new Item();
    item.icon = createItemDto.icon;
    item.url = createItemDto.url;
    item.title = createItemDto.title;
    return this.itemsRepository.save(item);
  }

  findAllByPageId(id: number) {
    return this.itemsRepository.find({
      relations: { page: true },
      where: {
        page: { id },
      },
    });
  }

  findOne(id: number) {
    return this.itemsRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    const item = this.itemsRepository.findOne({
      where: { id },
    });

    return this.itemsRepository.save({
      ...item,
      ...updateItemDto,
    });
  }

  remove(id: number) {
    const item = this.itemsRepository.findOne({
      where: { id },
    });
    return item.then((res) => this.itemsRepository.remove(res));
  }
}
