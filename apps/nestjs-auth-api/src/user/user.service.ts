import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@fazwaz-nx/nestjs-shared/utils/database';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
   ) {}

   async getUsers(): Promise<{ users: User[] }> {
      const users: User[] = await this.userRepository.find({
         select: ['id', 'email', 'first_name', 'last_name', 'phone', 'username'],
         take: 100,
      });
      return { users };
   }

   async create(createUserDto: CreateUserDto) {
      await this.validateCreateUserDto(createUserDto);
      // const password = await bcrypt.hash(password, 10);
      // this.userRepository.insert({ });
   }

   private async validateCreateUserDto(createUserDto: CreateUserDto) {
      try {
         await this.userRepository.findOneBy({ email: createUserDto.email });
      } catch (err) {
         return;
      }
      throw new UnprocessableEntityException('email is already taken');
   }

   async verifyUser(email: string, password: string) {
      const user = await this.userRepository.findOneByOrFail({ email });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         throw new UnauthorizedException('Credentials are not valid');
      }

      return user;
   }

   async getUser(getUserDto: GetUserDto) {
      return await this.userRepository.findOneByOrFail(getUserDto);
   }
}
