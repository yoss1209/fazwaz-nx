/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const config = app.get(ConfigService);

   app.use(cookieParser());
   app.useGlobalPipes(new ValidationPipe());
   app.useLogger(app.get(PinoLogger));

   const globalPrefix = 'api';
   app.setGlobalPrefix(globalPrefix);
   const port = config.getOrThrow<number>('TCP_PORT');
   await app.listen(port);
   Logger.log(`[${config.get('NODE_ENV')}] 🚀 NestJS auth API is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
