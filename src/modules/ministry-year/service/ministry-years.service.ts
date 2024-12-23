import { CreateMinistryYearDto } from '@/modules/ministry-year/dto/create-ministry-year.dto';
import { UpdateMinistryYearDto } from '@/modules/ministry-year/dto/update-ministry-year.dto';
import { MinistryYear } from '@/modules/ministry-year/schema/ministry-year.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose, { Model } from 'mongoose';

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
    return `This action returns a #${id} ministryYear`;
  }
  async update(updateMinistryYearDto: UpdateMinistryYearDto) {
    return await this.ministryYearsModule.updateOne(
      { _id: updateMinistryYearDto._id }, { ...updateMinistryYearDto });
  }

  async remove(_id: string) {
    //check id
    if (mongoose.isValidObjectId(_id)) {
      //detele
      return this.ministryYearsModule.deleteOne({ _id })
    }
    else {
      throw new BadRequestException("id không đúng định dạng mongodb")
    }
  }
}
