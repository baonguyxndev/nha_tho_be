import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { BibleVersion } from '@/modules/bible-version/schema/bible-version.schema';
import aqp from 'api-query-params';
import { CreateBibleVersionDto } from '../dto/create-bible-version.dto';
import { UpdateBibleVersionDto } from '../dto/update-bible-version.dto';

@Injectable()
export class BibleVersionsService {
  constructor(@InjectModel(BibleVersion.name) private bibleVersionModule: Model<BibleVersion>) { }


  async create(createBibleVersionDto: CreateBibleVersionDto) {
    const { name } = createBibleVersionDto;

    const bibleVersion = await this.bibleVersionModule.create({
      name
    })
    return {
      _id: bibleVersion._id
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

    const totalItems = (await this.bibleVersionModule.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * (+pageSize);

    const results = await this.bibleVersionModule
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
    return `This action returns a #${id} bibleVersion`;
  }

  async update(updateBibleVersionsDto: UpdateBibleVersionDto) {
    return await this.bibleVersionModule.updateOne(
      { _id: updateBibleVersionsDto._id }, { ...updateBibleVersionsDto });
  }

  async remove(_id: string) {
    //check id
    if (mongoose.isValidObjectId(_id)) {
      //detele
      return this.bibleVersionModule.deleteOne({ _id })
    }
    else {
      throw new BadRequestException("id không đúng định dạng mongodb")
    }
  }
}
