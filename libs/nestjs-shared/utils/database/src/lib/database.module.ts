import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from '../entities/unit.entity';
import { User } from '../entities/user.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        entities: [Unit, User],
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [],
})
export class NestjsUtilsDatabaseModule {}
