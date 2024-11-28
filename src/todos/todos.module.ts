import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TodoService } from './todos.service';
import { TodoController } from './todos.controller';
import { TodoEntity } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { AuthMiddleware } from 'src/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity]), CommonModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'todos', method: RequestMethod.POST },
        { path: 'todos/:id', method: RequestMethod.PATCH },
        { path: 'todos/:id', method: RequestMethod.DELETE },
      );
  }
}
