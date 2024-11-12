import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from '../../dtoes/news.dto/create-news.dto';
import { UpdateNewsDto } from '../../dtoes/news.dto/update-news.dto';
import aqp from 'api-query-params';
import { InjectModel } from '@nestjs/mongoose';
import { News } from '@/schemas/news.schema';
import { Model } from 'mongoose';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private ministryYearsModule: Model<News>) { }

  async create(createNewsDto: CreateNewsDto) {
    const { title, desc, ministryYearId, cateId, mainImg } = createNewsDto;

    const news = await this.ministryYearsModule.create({
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

    const totalItems = (await this.ministryYearsModule.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * (+pageSize);

    const results = await this.ministryYearsModule
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any);

    return { results, totalPages };
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
