import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateChapterDto } from '../../dtoes/chapters.dto/create-chapter.dto';
import { UpdateChapterDto } from '../../dtoes/chapters.dto/update-chapter.dto';
import { ChaptersService } from '@/servers/chapters.server/chapters.service';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) { }

  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @Get()
  findAll() {
    return this.chaptersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chaptersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(+id);
  }
}
