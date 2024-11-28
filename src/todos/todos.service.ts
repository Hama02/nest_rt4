// todos/todo.service.ts
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async addTodo(
    createTodoDto: CreateTodoDto,
    userId: string,
  ): Promise<TodoEntity> {
    const id = this.generateUUID();
    console.log(`Generated UUID: ${id}`);
    const todo = this.todoRepository.create({
      ...createTodoDto,
      id,
      userId,
    });
    return this.todoRepository.save(todo);
  }

  async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoDto,
    userId: string,
  ): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    if (todo.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this todo',
      );
    }
    await this.todoRepository.update(id, updateTodoDto);
    return this.todoRepository.findOne({ where: { id } });
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

  async deleteTodo(id: string, userId: string): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    if (todo.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this todo',
      );
    }
    await this.todoRepository.softDelete(id);
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
