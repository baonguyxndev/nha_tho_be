import { BadRequestException, Injectable } from '@nestjs/common';
import aqp from 'api-query-params';
import { InjectModel } from '@nestjs/mongoose';
import { News } from '@/modules/news/schema/news.schema';
import mongoose, { Model } from 'mongoose';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModule: Model<News>) { }

  async create(createNewsDto: CreateNewsDto) {
    const { title, desc, ministryYearId, cateId, mainImg } = createNewsDto;

    const news = await this.newsModule.create({
      title, desc, ministryYearId, cateId, mainImg
    })
    return {
      _id: news._id
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

    const totalItems = (await this.newsModule.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * (+pageSize);

    const results = await this.newsModule
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
    return `This action returns a #${id} news`;
  }

  async update(updateNewsDto: UpdateNewsDto) {
    return await this.newsModule.updateOne(
      { _id: updateNewsDto._id }, { ...updateNewsDto });
  }

  async remove(_id: string) {
    //check id
    if (mongoose.isValidObjectId(_id)) {
      //detele
      return this.newsModule.deleteOne({ _id })
    }
    else {
      throw new BadRequestException("id không đúng định dạng mongodb")
    }
  }
}
