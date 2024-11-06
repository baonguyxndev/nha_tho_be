import { Injectable } from '@nestjs/common';
import { CreateBibleVersionDto } from '../../dtoes/bible-versions.dto/create-bible-version.dto';
import { UpdateBibleVersionDto } from '../../dtoes/bible-versions.dto/update-bible-version.dto';

@Injectable()
export class BibleVersionsService {
  create(createBibleVersionDto: CreateBibleVersionDto) {
    return 'This action adds a new bibleVersion';
  }

  findAll() {
    return `This action returns all bibleVersions`;
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
