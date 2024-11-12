import { CreateBookDto } from '@/dtoes/books.dto/create-book.dto';
import { UpdateBookDto } from '@/dtoes/books.dto/update-book.dto';
import { BooksModule } from '@/modules/books.module';
import { Book } from '@/schemas/book.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { Model } from 'mongoose';


@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModule: Model<Book>) { }

  async create(createBookDto: CreateBookDto) {
    const { name, bibleVerionId } = createBookDto;

    const book = await this.bookModule.create({
      name, bibleVerionId
    })
    return {
      _id: book._id
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query)

    if (filter.current)
      delete filter.current;
    if (filter.pageSize)
      delete filter.pageSize;

    if (!current)
      current = 1;
    if (!pageSize)
      pageSize = 10;

    const totalItems = (await this.bookModule.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * (+pageSize);

    const results = await this.bookModule
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any);

    return { results, totalPages };
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

