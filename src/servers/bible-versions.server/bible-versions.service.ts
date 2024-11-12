import { Injectable } from '@nestjs/common';
import { CreateBibleVersionDto } from '../../dtoes/bible-versions.dto/create-bible-version.dto';
import { UpdateBibleVersionDto } from '../../dtoes/bible-versions.dto/update-bible-version.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BibleVersion } from '@/schemas/bible-version.schema';
import aqp from 'api-query-params';

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

    return { results, totalPages };
  }

  findOne(id: number) {
    return `This action returns a #${id} bibleVersion`;
  }

  update(id: number, updateBibleVersionDto: UpdateBibleVersionDto) {
    return `This action updates a #${id} bibleVersion`;
  }

  remove(id: number) {
    return `This action removes a #${id} bibleVersion`;
  }
}
