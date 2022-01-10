import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewTodoInput } from './dto/new-todo.input';
import { TodoArgs } from './dto/todo.arg';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

const pubSub = new PubSub();

@Resolver(of => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(returns => Todo)
  async todo(@Args('id') id: string): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException(id);
    }
    return todo;
  }

  @Query(returns => [Todo])
  todos(@Args() todosArgs: TodoArgs): Promise<Todo[]> {
    return this.todoService.findAll(todosArgs);
  }

  @Mutation(returns => Todo)
  async addTodo(
    @Args('newTodoData') newTodoData: NewTodoInput,
  ): Promise<Todo> {
    const todo = await this.todoService.create(newTodoData);
    pubSub.publish('todoAdded', { todoAdded: todo });
    return todo;
  }

  @Mutation(returns => Boolean)
  async removeTodo(@Args('id') id: string) {
    return this.todoService.remove(id);
  }

  @Subscription(returns => Todo)
  todoAdded() {
    return pubSub.asyncIterator('todoAdded');
  }
}
