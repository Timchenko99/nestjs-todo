import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Todo } from 'src/todo/todo.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id!: string;

  @Column({ type: 'varchar', unique: true })
  @Field()
  username!: string;

  @Column({ type: 'varchar', unique: true })
  @Field()
  email!: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password!: string;

  @OneToMany(() => Todo, (todo) => todo.creator)
  todos: Todo[];

  @CreateDateColumn()
  @Field(() => String)
  createdOn!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedOn!: Date;
}
