import { Injectable, NestMiddleware } from '@nestjs/common';
import { validate } from '@tma.js/init-data-node';
import * as process from 'node:process';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const initData = req.body.initData;
    if (process.env.VALIDATION_ENABLE === 'true') {
      validate(initData, process.env.TELEGRAM_SECRET);
    }
    next();
  }
}
