import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoArgs } from './dto/todo.arg';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = new Todo();
    newTodo.title = createTodoDto.title;
    newTodo.description ??= createTodoDto.description;
    return this.todoRepository.save(newTodo);
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoRepository.findOne(id);
  }

  async findAll(todoArgs: TodoArgs): Promise<Todo[]> {
    return this.todoRepository.find({
      take: todoArgs.take,
      skip: todoArgs.skip,
    });
  }

  async remove(id: string): Promise<boolean> {
    return !id;
  }
}
