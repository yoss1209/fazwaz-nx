import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '@fazwaz-nx/nestjs-shared/utils/database';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Post()
   async createUser(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
   }

   @Get('all')
   async getUsers() {
      return this.userService.getUsers();
   }

   @Get('me')
   @UseGuards(JwtAuthGuard)
   async getMe(@CurrentUser() user: User) {
      return user;
   }
}
