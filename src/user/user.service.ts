import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const { username, password, email } = userDto;

    const userInDb = await this.findOneByUsername(username);

    if (userInDb)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const newUser: UserEntity = this.userRepository.create({ username, password, email });

    return await this.userRepository.save(newUser);
  }

  updateUser(): Promise<UserEntity> {

  }

  deleteUser(): Promise<UserEntity> {

  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ username: username });
  }
}
