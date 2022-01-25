import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UsernamePasswordInput } from './input/username-password.input';
import { NewUserInput } from './input/new-user.input';

@Resolver(of => UserEntity)
export class UserResolver{
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) {}
  
  @Mutation(returns => UserEntity)
  register(@Args() newUserInput: NewUserInput): Promise<UserEntity> {
    return this.authService.register(newUserInput);
  }    

}

