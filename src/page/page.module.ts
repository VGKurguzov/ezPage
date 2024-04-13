import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { EnrichmentInterceptor } from '../auth/enrichment.interceptor';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page, User])],
  controllers: [PageController],
  providers: [PageService, UserService, EnrichmentInterceptor],
})
export class PageModule {}
