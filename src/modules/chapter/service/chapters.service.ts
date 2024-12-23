import { BadRequestException, Injectable } from '@nestjs/common';
import aqp from 'api-query-params';
import { Chapter } from '@/modules/chapter/schema/chapter.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(@InjectModel(Chapter.name) private chaptersModule: Model<Chapter>) { }

  async create(createChapterDto: CreateChapterDto) {
    const { number, bookId } = createChapterDto;

    const category = await this.chaptersModule.create({
      number, bookId
    })
    return {
      _id: category._id
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

    const totalItems = (await this.chaptersModule.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * (+pageSize);

    const results = await this.chaptersModule
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
    return `This action returns a #${id} chapter`;
  }

  async update(updateChapterDto: UpdateChapterDto) {
    return await this.chaptersModule.updateOne(
      { _id: updateChapterDto._id }, { ...updateChapterDto });
  }

  async remove(_id: string) {
    //check id
    if (mongoose.isValidObjectId(_id)) {
      //detele
      return this.chaptersModule.deleteOne({ _id })
    }
    else {
      throw new BadRequestException("id không đúng định dạng mongodb")
    }
  }
}
