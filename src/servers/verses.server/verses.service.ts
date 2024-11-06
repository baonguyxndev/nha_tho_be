import { Injectable } from '@nestjs/common';
import { CreateVerseDto } from '../../dtoes/verses.dto/create-verse.dto';
import { UpdateVerseDto } from '../../dtoes/verses.dto/update-verse.dto';

@Injectable()
export class VersesService {
  create(createVerseDto: CreateVerseDto) {
    return 'This action adds a new verse';
  }

  findAll() {
    return `This action returns all verses`;
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
