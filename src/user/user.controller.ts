import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { EnrichmentInterceptor } from '../auth/enrichment.interceptor';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth')
  @UseGuards(AuthGuard)
  @UseInterceptors(EnrichmentInterceptor)
  async auth(@Body() authUserDto: AuthUserDto) {
    return await this.userService.auth(authUserDto);
  }
}
