import { Book } from '@/modules/book/schema/book.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose, { Model } from 'mongoose';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';


@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModule: Model<Book>) { }

  async create(createBookDto: CreateBookDto) {
    const { name, bibleVersionId } = createBookDto;

    const book = await this.bookModule.create({
      name, bibleVersionId
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

    return {
      meta: {
        current: current, // trang hiện tại 
        pageSize: pageSize, // số lượng phần tử đã lấy
        pages: totalPages, // tổng số lượng trang với điều kiện query
        total: totalItems // tổng số phần tử 
      },
      results // kết quả query
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  async update(updateBookDto: UpdateBookDto) {
    return await this.bookModule.updateOne(
      { _id: updateBookDto._id }, { ...updateBookDto });
  }

  async remove(_id: string) {
    //check id
    if (mongoose.isValidObjectId(_id)) {
      //detele
      return this.bookModule.deleteOne({ _id })
    }
    else {
      throw new BadRequestException("id không đúng định dạng mongodb")
    }
  }
}

