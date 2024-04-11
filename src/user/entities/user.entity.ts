import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../../page/entities/page.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Page, page => page.user)
  pages: Page[];
}
