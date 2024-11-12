import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NewsImage } from '@/modules/news-image/schema/new-image.schema';
import aqp from 'api-query-params';
import { Model } from 'mongoose';
import { CreateNewsImageDto } from '@/modules/news-image/dto/create-new-image.dto';
import { UpdateNewsImageDto } from '@/modules/news-image/dto/update-new-image.dto';

@Injectable()
export class NewsImagesService {
  constructor(@InjectModel(NewsImage.name) private ministryYearsModule: Model<NewsImage>) { }

  async create(createNewsImageDto: CreateNewsImageDto) {
    const { newsId, imgPath, number } = createNewsImageDto;

    const newsImg = await this.ministryYearsModule.create({
      newsId, imgPath, number
    })
    return {
      _id: newsImg._id
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
    return `This action returns a #${id} NewsImage`;
  }

  update(id: number, updateNewsImageDto: UpdateNewsImageDto) {
    return `This action updates a #${id} NewsImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} NewsImage`;
  }
}
