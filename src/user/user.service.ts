import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const {username, password, email } = userDto;

    const userInDb = await this.findOneByUsername(username);

    if(userInDb)throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const newUser: UserEntity = await this.userRepository.create({username, password, email});

    return await this.userRepository.save(newUser);
  }


  async findOne(id: string): Promise<UserDto> {
    return await this.userRepository.findOne(id);
  }

  async findOneByUsername(username: string): Promise<UserDto> {
    return await this.userRepository.findOne({username: username});
  }
}
