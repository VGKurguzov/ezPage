import { Page } from '../../page/entities/page.entity';

export class ResponseUserDto {
  tgId: number;
  pages: Page[];
}
