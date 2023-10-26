import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@fazwaz-nx/nestjs-shared/utils/database';
import { NestjsUtilsDatabaseModule } from '@fazwaz-nx/nestjs-shared/utils/database';

@Module({
  imports: [NestjsUtilsDatabaseModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
