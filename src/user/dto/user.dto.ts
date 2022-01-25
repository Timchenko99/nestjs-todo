import {IsNotEmpty, IsEmail, IsDate} from 'class-validator';

export class UserDto{
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  createdOn: Date;

  @IsNotEmpty()
  @IsDate()
  updatedOn: Date;
}
