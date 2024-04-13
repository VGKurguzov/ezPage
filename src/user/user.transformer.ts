import { Injectable } from '@nestjs/common';
import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './entities/user.entity';
import { Page } from '../page/entities/page.entity';

@Injectable()
export class UserTransformer {
  public toResponseDto(user: User, pages: Page[]): ResponseUserDto {
    const entity = new ResponseUserDto();
    entity.tgId = user.tgId;
    entity.pages = pages;
    return entity;
  }
}
