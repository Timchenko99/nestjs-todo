import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { Todo } from './todo/todo.entity';
import { TodosModule } from './todo/todo.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 
        path.join(process.cwd(), 'src/schema.gql'),
    }),
    TodosModule,
    UserModule,
  ],
})
export class AppModule {}
