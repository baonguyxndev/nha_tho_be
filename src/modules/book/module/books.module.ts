import { BooksController } from '@/modules/book/controller/books.controller';
import { Book, BookSchema } from '@/modules/book/schema/book.schema';
import { BooksService } from '@/modules/book/service/books.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule { }
