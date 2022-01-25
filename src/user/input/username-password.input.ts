import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;

}
