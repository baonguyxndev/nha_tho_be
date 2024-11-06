import { CreateMinistryYearDto } from '@/dtoes/ministry-years.dto/create-ministry-year.dto';
import { UpdateMinistryYearDto } from '@/dtoes/ministry-years.dto/update-ministry-year.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MinistryYearsService {
  create(createMinistryYearDto: CreateMinistryYearDto) {
    return 'This action adds a new ministryYear';
  }

  findAll() {
    return `This action returns all ministryYears`;
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
