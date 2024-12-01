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
      _id: news._id,
      mainImg: news.mainImg, // Trả về URL ảnh đã upload
    };
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
    // Lấy ID từ updateNewsDto
    const { _id, ...updateData } = updateNewsDto;

    // Kiểm tra xem tin tức có tồn tại trong DB không
    const news = await this.newsModule.findById(_id);
    if (!news) {
      throw new BadRequestException('Tin tức không tồn tại');
    }

    // Cập nhật các trường dữ liệu
    return await this.newsModule.updateOne(
      { _id },
      { ...updateData }, // Cập nhật với các trường trong updateNewsDto
    );
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
