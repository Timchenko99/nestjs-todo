import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

import argon2 from 'argon2';
import { NewUserInput } from '../user/dto/new-user.input';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    const valid = await argon2.verify(user.password, password);
    if(!valid) return null;
    return {user};
  }


  login(){

  }


  async register(newUserInput: NewUserInput): Promise<User> {
    return await this.userService.create(newUserInput);
  }
}
