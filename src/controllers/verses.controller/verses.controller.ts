import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateVerseDto } from '../../dtoes/verses.dto/create-verse.dto';
import { UpdateVerseDto } from '../../dtoes/verses.dto/update-verse.dto';
import { VersesService } from '@/servers/verses.server/verses.service';

@Controller('verses')
export class VersesController {
  constructor(private readonly versesService: VersesService) { }

  @Post()
  create(@Body() createVerseDto: CreateVerseDto) {
    return this.versesService.create(createVerseDto);
  }

  @Get()
  findAll() {
    return this.versesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerseDto: UpdateVerseDto) {
    return this.versesService.update(+id, updateVerseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versesService.remove(+id);
  }
}
