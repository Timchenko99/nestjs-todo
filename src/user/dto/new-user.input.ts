import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewUserInput{
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
