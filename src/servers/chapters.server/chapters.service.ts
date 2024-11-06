import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from '../../dtoes/chapters.dto/create-chapter.dto';
import { UpdateChapterDto } from '../../dtoes/chapters.dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  create(createChapterDto: CreateChapterDto) {
    return 'This action adds a new chapter';
  }

  findAll() {
    return `This action returns all chapters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapter`;
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
