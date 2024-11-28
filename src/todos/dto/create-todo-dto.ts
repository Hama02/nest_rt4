// todos/dto/create-todo.dto.ts
import { IsString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { StatusEnum } from '../todo.entity';

export class CreateTodoDto {
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(10, { message: 'Name must be at most 10 characters long' })
  name: string;

  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description: string;

  @IsEnum(StatusEnum, { message: 'Status must be a valid enum value' })
  status?: StatusEnum;
}
