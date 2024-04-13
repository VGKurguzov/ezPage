import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Page } from '../page/entities/page.entity';
import { EnrichmentInterceptor } from '../auth/enrichment.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User, Page])],
  controllers: [UserController],
  providers: [UserService, EnrichmentInterceptor],
})
export class UserModule {}
