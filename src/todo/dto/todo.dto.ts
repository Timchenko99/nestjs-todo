import { IsNotEmpty } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

export class TodoDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  description?: string;

  authorId: UserDto;

  creationDate: Date;

  updateDate: Date;
}
