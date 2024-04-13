import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class EnrichmentInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.headers['init-data']) {
      const data: any = JSON.parse(request.headers['init-data']);
      if (!data || !data.id) {
        throw new BadRequestException('Data not found');
      }
      request.body['tgId'] = data.id;
      return next.handle();
    }
    return next
      .handle()
      .pipe(catchError(() => throwError(() => new BadRequestException())));
  }
}
