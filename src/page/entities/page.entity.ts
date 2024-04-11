import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mainImage: string;

  @Column()
  username: string;

  @OneToMany(type => Item, item => item.page)
  items: Item[];

  @ManyToOne(type => User, user => user.pages)
  user: User;
}
