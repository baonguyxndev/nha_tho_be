import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '@/modules/category/schema/category.schema';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoriesModule: Model<Category>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    const category = await this.categoriesModule.create({
      name
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

    const totalItems = (await this.categoriesModule.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * (+pageSize);

    const results = await this.categoriesModule
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any);

    return { results, totalPages };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
