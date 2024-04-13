import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from '../../page/entities/page.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  icon?: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @Exclude()
  @ManyToOne(type => Page, page => page.items)
  page: Page;
}
