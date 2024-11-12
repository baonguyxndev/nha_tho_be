import { CreateMinistryYearDto } from '@/dtoes/ministry-years.dto/create-ministry-year.dto';
import { UpdateMinistryYearDto } from '@/dtoes/ministry-years.dto/update-ministry-year.dto';
import { MinistryYear } from '@/schemas/ministry-year.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { Model } from 'mongoose';

@Injectable()
export class MinistryYearsService {
  constructor(@InjectModel(MinistryYear.name) private ministryYearsModule: Model<MinistryYear>) { }

  async create(createMinistryYearDto: CreateMinistryYearDto) {
    const { name, desc, cateId } = createMinistryYearDto;

    const ministryYear = await this.ministryYearsModule.create({
      name, desc, cateId
    })
    return {
      _id: ministryYear._id
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
    return `This action returns a #${id} ministryYear`;
  }

  update(id: number, updateMinistryYearDto: UpdateMinistryYearDto) {
    return `This action updates a #${id} ministryYear`;
  }

  remove(id: number) {
    return `This action removes a #${id} ministryYear`;
  }
}
