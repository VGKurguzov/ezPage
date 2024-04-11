import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private pagesRepository: Repository<Page>,
  ) {}

  create(createPageDto: CreatePageDto) {
    const page = new Page();
    page.mainImage = createPageDto.mainImage;
    page.username = createPageDto.username;
    return this.pagesRepository.save(page);
  }

  findAllByUserId(id: number) {
    return this.pagesRepository.find({
      relations: { user: true },
      where: {
        user: { id },
      },
    });
  }

  findOne(id: number) {
    return this.pagesRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    const page = this.pagesRepository.findOne({
      where: { id },
    });

    return this.pagesRepository.save({
      ...page,
      ...updatePageDto,
    });
  }

  remove(id: number) {
    const page = this.pagesRepository.findOne({
      where: { id },
    });
    return page.then((res) => this.pagesRepository.remove(res));
  }
}
