import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'todos' })
@ObjectType({ description: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @Field()
  @ManyToOne(() => User, (user) => user.todos)
  authorId: User;

  @CreateDateColumn()
  @Field(() => String)
  creationDate: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updateDate: Date;
}
