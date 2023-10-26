import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';

import { AuthService } from './app.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '@fazwaz-nx/nestjs-shared/utils/database';
import { Response } from 'express';

@Controller('auth')
export class AppController {
   constructor(private readonly authService: AuthService) {}

   @UseGuards(LocalAuthGuard)
   @Post('login')
   async login(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response) {
      await this.authService.login(user, response);
      response.send(user);
   }
}
