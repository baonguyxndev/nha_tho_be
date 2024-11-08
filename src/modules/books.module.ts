import { BooksController } from '@/controllers/books.controller/books.controller';
import { Book, BookSchema } from '@/schemas/book.schema';
import { BooksService } from '@/servers/books.server/books.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule { }
