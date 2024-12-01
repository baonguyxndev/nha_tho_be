import { BadRequestException, Injectable } from '@nestjs/common';
import aqp from 'api-query-params';
import { InjectModel } from '@nestjs/mongoose';
import { Verse } from '@/modules/verse/schema/verse.schema';
import mongoose, { Model } from 'mongoose';
import { CreateVerseDto } from '../dto/create-verse.dto';
import { UpdateVerseDto } from '../dto/update-verse.dto';

@Injectable()
export class VersesService {
  constructor(@InjectModel(Verse.name) private verseModule: Model<Verse>) { }

  async create(createVerseDto: CreateVerseDto) {
    const { number, desc, chapterId } = createVerseDto;

    const verse = await this.verseModule.create({
      number, desc, chapterId
    })
    return {
      _id: verse._id
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

    const totalItems = (await this.verseModule.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * (+pageSize);

    const results = await this.verseModule
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
    return `This action returns a #${id} verse`;
  }

  async update(updateVerseDto: UpdateVerseDto) {
    return await this.verseModule.updateOne(
      { _id: updateVerseDto._id }, { ...updateVerseDto });
  }

  async remove(_id: string) {
    //check id
    if (mongoose.isValidObjectId(_id)) {
      //detele
      return this.verseModule.deleteOne({ _id })
    }
    else {
      throw new BadRequestException("id không đúng định dạng mongodb")
    }
  }
}
