import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
      super({
         jwtFromRequest: ExtractJwt.fromExtractors([
            (request: any) =>
               request?.cookies?.Authentication || request?.Authentication || request?.headers.Authentication,
         ]),
         secretOrKey: configService.get<string>('JWT_SECRET'),
      });
   }

   async validate({ userId }: TokenPayload) {
      return await this.userService.getUser({ id: userId });
   }
}
