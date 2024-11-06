import { CreateBookDto } from '@/dtoes/books.dto/create-book.dto';
import { UpdateBookDto } from '@/dtoes/books.dto/update-book.dto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class BooksService {
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
