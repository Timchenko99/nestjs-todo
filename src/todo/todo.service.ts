import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoArgs } from './dto/todo.arg';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    const newTodo = new Todo();
    newTodo.title = createTodoDto.title;
    newTodo.description ??= createTodoDto.description;
    return this.todoRepository.save(newTodo);
  }

  findOne(id: string): Promise<Todo> {
    return this.todoRepository.findOne(id);
  }

  findAll(options?: any): Promise<Todo[]> {
    return this.todoRepository.find(options ?? {});
  }

  remove(id: string): Promise<boolean> {
    return !id;
  }
}
