import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsUtilsDatabaseModule, Unit } from '@fazwaz-nx/nestjs-shared/utils/database';
import { NestjsUtilsLoggerModule } from '@fazwaz-nx/nestjs-shared/utils/logger';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USERNAME: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
      }),
    }),
    NestjsUtilsDatabaseModule,
    TypeOrmModule.forFeature([Unit]),
    NestjsUtilsLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
