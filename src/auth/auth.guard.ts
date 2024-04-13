import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { validate } from '@tma.js/init-data-node';
import process from 'node:process';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const initData = request.headers['initData'];
    validate(initData, process.env.TELEGRAM_SECRET);
    return true;
  }
}
