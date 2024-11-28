// todos/todo.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusEnum, TodoEntity } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    @Inject('UUID') private readonly generateUUID: () => string,
  ) {}

  async addTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const id = this.generateUUID();
    console.log(`Generated UUID: ${id}`);
    const todo = this.todoRepository.create({
      ...createTodoDto,
      id,
    });
    return this.todoRepository.save(todo);
  }
  async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    await this.todoRepository.update(id, updateTodoDto);
    const updatedTodo = await this.todoRepository.findOne({ where: { id } });
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return updatedTodo;
  }

  findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  async getTodoById(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async deleteTodo(id: string): Promise<void> {
    const result = await this.todoRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }

  async restoreTodo(id: string): Promise<void> {
    await this.todoRepository.restore(id);
  }

  countTodosByStatus(status: StatusEnum): Promise<number> {
    return this.todoRepository.count({ where: { status } });
  }

  async findTodos(
    name?: string,
    status?: StatusEnum,
    page = 1,
    limit = 10,
  ): Promise<{ data: TodoEntity[]; count: number }> {
    const queryBuilder = this.todoRepository.createQueryBuilder('todo');

    if (name) {
      queryBuilder.andWhere('(todo.name ILIKE :name)', {
        name: `%${name}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('todo.status = :status', { status });
    }

    const [data, count] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, count };
  }
}
