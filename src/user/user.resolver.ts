import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UsernamePasswordInput } from './dto/username-password.input';
import { NewUserInput } from './dto/new-user.input';

@Resolver(of => User)
export class UserResolver{
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) {}
  
  @Mutation(returns => User)
  register(@Args() newUserInput: NewUserInput): Promise<User> {
    return this.authService.register(NewUserInput);
  }    

}

