import { User } from '@fazwaz-nx/nestjs-shared/utils/database';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class AuthService {
   constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

   async login(user: User, response: Response) {
      const tokenPayload: TokenPayload = {
         userId: user.id,
      };

      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION_SECONDS'));

      const signedToken = this.jwtService.sign(tokenPayload);

      response.cookie('Authentication', signedToken, {
         httpOnly: true,
         expires,
      });
   }
}
