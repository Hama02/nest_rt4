import { Module } from '@nestjs/common';
import { TodoService } from './todos.service';
import { TodoController } from './todos.controller';
import { TodoEntity } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity]), CommonModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodosModule {}
