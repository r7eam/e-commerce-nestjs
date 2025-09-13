import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './products/productmodule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
     
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'r7eam',
      database: 'e-commerce-nestJs',
      autoLoadEntities: true,
      synchronize: true,
    }),
   UsersModule,
   CategoriesModule,
   ProductModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
