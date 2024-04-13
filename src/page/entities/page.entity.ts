import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { User } from '../../user/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  username: string;

  @OneToMany(type => Item, item => item.page)
  items: Item[];

  @Exclude()
  @ManyToOne(type => User, user => user.pages)
  user: User;

  constructor(partial: Partial<Page>) {
    Object.assign(this, partial);
  }
}
