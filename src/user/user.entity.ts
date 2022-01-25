import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import argon2 from 'argon2';
import { Todo } from 'src/todo/todo.entity';

@Entity({name: "users"})
@ObjectType()
export class UserEntity{
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id!: string;

  @Column({type: 'varchar', unique: true })
  @Field()
  username!: string;

  @Column({type: 'varchar', unique: true })
  @Field()
  email!: string;

  @Column({type: 'varchar'})
  password!: string;

  @OneToMany(() => Todo, (todo) => todo.creator)
  todos: Todo[];

  @CreateDateColumn()
  @Field(() => String)
  createdOn!: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedOn!: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
