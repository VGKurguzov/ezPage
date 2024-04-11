import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../../page/entities/page.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icon: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @ManyToOne(type => Page, page => page.items)
  page: Page;
}
