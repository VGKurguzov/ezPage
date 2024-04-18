import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { parseInitData } from '@tma.js/sdk';

@Injectable()
export class EnrichmentInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.headers['init-data']) {
      const initData = parseInitData(request.headers['init-data']);
      if (!initData || !initData.user.id) {
        throw new BadRequestException('Data not found');
      }
      request.body['tgId'] = initData.user.id;
      return next.handle();
    }
    return next
      .handle()
      .pipe(catchError(() => throwError(() => new BadRequestException())));
  }
}
