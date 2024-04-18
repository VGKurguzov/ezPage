import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RemovePageDto } from './dto/remove-page.dto';
import { GetPageDto } from './dto/get-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async create(createPageDto: CreatePageDto) {
    const user = await this.userService.findOne(createPageDto.tgId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const page = new Page({
      avatar: createPageDto.avatar,
      username: createPageDto.username,
      user: user,
    });
    return await this.pagesRepository.save(page);
  }

  async findAllByTgId(tgId: number, getPageDto: GetPageDto) {
    if (tgId != getPageDto.tgId) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
    return await this.pagesRepository.find({
      relations: {
        items: true,
      },
      where: {
        user: { tgId },
      },
    });
  }

  async findOne(id: number) {
    return await this.pagesRepository.findOne({
      relations: ['user', 'items'],
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    const page = await this.pagesRepository.findOne({
      relations: {
        user: true,
      },
      where: { id },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    if (page.user.tgId != updatePageDto.tgId) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    await this.pagesRepository.update(
      { id },
      { avatar: updatePageDto.avatar, username: updatePageDto.username },
    );
    return;
  }

  async remove(id: number, removePageDto: RemovePageDto) {
    const page = await this.pagesRepository.findOne({
      relations: {
        user: true,
      },
      where: { id },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    if (page.user.tgId != removePageDto.tgId) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    await this.pagesRepository.remove(page);
    return;
  }
}
