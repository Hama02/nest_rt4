import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { TodoService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { StatusEnum, TodoEntity } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(
    @Query('name') name?: string,
    @Query('status') status?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ data: TodoEntity[]; count: number }> {
    page = Number(page);
    limit = Number(limit);
    return this.todoService.findTodos(name, status as StatusEnum, page, limit);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  async addTodo(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: any,
  ): Promise<TodoEntity> {
    const userId = req.user.userId;
    return this.todoService.addTodo(createTodoDto, userId);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: any,
  ): Promise<TodoEntity> {
    const userId = req.user.userId;
    return this.todoService.updateTodo(id, updateTodoDto, userId);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Req() req: any): Promise<void> {
    const userId = req.user.userId;
    return this.todoService.deleteTodo(id, userId);
  }

  @Post(':id/restore')
  async restoreTodo(@Param('id') id: string) {
    return this.todoService.restoreTodo(id);
  }

  @Get('count/:status')
  async countTodosByStatus(@Param('status') status: string) {
    return this.todoService.countTodosByStatus(status as any);
  }
}
