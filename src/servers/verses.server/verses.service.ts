import { Injectable } from '@nestjs/common';
import { CreateVerseDto } from '../../dtoes/verses.dto/create-verse.dto';
import { UpdateVerseDto } from '../../dtoes/verses.dto/update-verse.dto';
import aqp from 'api-query-params';
import { InjectModel } from '@nestjs/mongoose';
import { Verse } from '@/schemas/verse.schema';
import { Model } from 'mongoose';

@Injectable()
export class VersesService {
  constructor(@InjectModel(Verse.name) private ministryYearsModule: Model<Verse>) { }

  async create(createVerseDto: CreateVerseDto) {
    const { number, desc, chapterId } = createVerseDto;

    const verse = await this.ministryYearsModule.create({
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
    return `This action returns a #${id} verse`;
  }

  update(id: number, updateVerseDto: UpdateVerseDto) {
    return `This action updates a #${id} verse`;
  }

  remove(id: number) {
    return `This action removes a #${id} verse`;
  }
}
