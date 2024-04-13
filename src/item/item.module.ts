import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { EnrichmentInterceptor } from '../auth/enrichment.interceptor';
import { User } from '../user/entities/user.entity';
import { Page } from '../page/entities/page.entity';
import { PageService } from '../page/page.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, User, Page])],
  controllers: [ItemController],
  providers: [ItemService, UserService, PageService, EnrichmentInterceptor],
})
export class ItemModule {}
