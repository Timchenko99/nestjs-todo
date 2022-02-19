import { Resolver, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { NewUserInput } from './input/new-user.input';
import { UseGuards } from '@nestjs/common';
import RequestWithUser from 'src/auth/types/requestWithUser.interface';
import { TodoService } from 'src/todo/todo.service';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly todoService: TodoService
  ) { }

  @Mutation((returns) => UserEntity)
  create(@Args() newUser: NewUserInput): Promise<UserEntity> {
    return this.userService.createUser(newUser);
  }

  @Mutation()
  forgotPassword() { }

  @Mutation()
  @UseGuards()
  login(@Context() context: { req: RequestWithUser }) {
    console.log(context.req.user);
  }

  @ResolveField()
  todos(@Parent() { id }: UserEntity) {
    this.todoService.findAll({ authorId: id });
  }
}
