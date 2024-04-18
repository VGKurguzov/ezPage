import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { RemoveItemDto } from './dto/remove-item.dto';
import { UserService } from '../user/user.service';
import { PageService } from '../page/page.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(PageService)
    private readonly pageService: PageService,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const user = await this.userService.findOne(createItemDto.tgId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const page = await this.pageService.findOne(createItemDto.pageId);

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    if (page.user.tgId != createItemDto.tgId) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    const item = new Item();
    item.icon = createItemDto.icon;
    item.url = createItemDto.url;
    item.title = createItemDto.title;
    item.page = page;
    return await this.itemsRepository.save(item);
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOne({
      relations: ['page', 'page.user'],
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    if (!item.page) {
      throw new NotFoundException('Page not found');
    }

    if (item && item.page && item.page.user.tgId != updateItemDto.tgId) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    await this.itemsRepository.update(
      { id },
      {
        icon: updateItemDto.icon,
        url: updateItemDto.url,
        title: updateItemDto.title,
      },
    );
    return;
  }

  async remove(id: number, removeItemDto: RemoveItemDto) {
    const item = await this.itemsRepository.findOne({
      relations: ['page', 'page.user'],
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    if (!item.page) {
      throw new NotFoundException('Page not found');
    }

    if (item.page && item.page.user.tgId != removeItemDto.tgId) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    await this.itemsRepository.remove(item);
    return;
  }
}
