import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { validate } from '@tma.js/init-data-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const initData: string = request.headers['init-data'];
    const token: string = this.configService.get<string>('TELEGRAM_SECRET');
    try {
      validate(initData, token);
    } catch (e) {
      return false;
    }
    return true;
  }
}
