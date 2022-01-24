import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import argon2 from 'argon2';
import { NewUserInput } from './dto/new-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(newUserInput: NewUserInput): Promise<User> {
    const newUser = new User();
    newUser.email = newUserInput.email;
    newUser.password = await argon2.hash(newUserInput.password);
    newUser.username = newUserInput.username;
    return this.userRepository.save(newUser);
  }


  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({username: username});
  }
}
