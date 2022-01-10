import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Todo } from 'src/todo/todo.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({name: "users"})
@ObjectType()
export class User{
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id!: string;

  @Column({ unique: true })
  @Field()
  username!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Todo, (todo) => todo.creator)
  todos: Todo[];

  @CreateDateColumn()
  @Field(() => String)
  creationDate: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updateDate: Date;
}
