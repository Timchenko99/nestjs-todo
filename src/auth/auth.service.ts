import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { NewUserInput } from '../user/input/new-user.input';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(createUserDto: CreateUserDto): Promise<any> {
    const { password } = createUserDto;
    const hashedPassword = await argon2.hash(password)
    //const {password, ...user} = await this.userService.findOneByUsername(username);
    //const valid = await argon2.verify(password, userPassword);
    //if(!valid) return null;
    //return user;
  }


  login(){

  }


  async register(newUserInput: NewUserInput): Promise<User> {
    return await this.userService.create(newUserInput);
  }
}
