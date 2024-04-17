import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const corsOptions = {
    origin: '*',
  };
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  await app.listen(3000);
}
bootstrap();
