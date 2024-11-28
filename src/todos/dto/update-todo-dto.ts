// todos/dto/update-todo.dto.ts
import { IsOptional } from 'class-validator';
import { CreateTodoDto } from './create-todo-dto';
import { PartialType } from '@nestjs/mapped-types';
import { StatusEnum } from '../todo.entity';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  status?: StatusEnum;
}
