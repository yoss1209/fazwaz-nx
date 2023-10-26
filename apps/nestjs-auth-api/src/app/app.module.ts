import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthService } from './app.service';
import { UserModule } from '../user/user.module';
import { NestjsUtilsLoggerModule } from '@fazwaz-nx/nestjs-shared/utils/logger';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
   imports: [
      UserModule,
      NestjsUtilsLoggerModule,
      ConfigModule.forRoot({
         isGlobal: true,
         validationSchema: Joi.object({
            MYSQL_HOST: Joi.string().required(),
            MYSQL_PORT: Joi.number().required(),
            MYSQL_USERNAME: Joi.string().required(),
            MYSQL_PASSWORD: Joi.string().required(),
            MYSQL_DATABASE: Joi.string().required(),
            TCP_PORT: Joi.number().required(),
            JWT_SECRET: Joi.string().required(),
         }),
      }),
      JwtModule.registerAsync({
         useFactory: (configService: ConfigService) => ({
            secret: configService.getOrThrow<string>('JWT_SECRET'),
            signOptions: {
               expiresIn: `${configService.getOrThrow<number>('JWT_EXPIRATION_SECONDS')}s`,
            },
         }),
         inject: [ConfigService],
      }),
   ],
   controllers: [AppController],
   providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
