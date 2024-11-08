import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateBibleVersionDto } from '../../dtoes/bible-versions.dto/create-bible-version.dto';
import { UpdateBibleVersionDto } from '../../dtoes/bible-versions.dto/update-bible-version.dto';
import { BibleVersionsService } from '@/servers/bible-versions.server/bible-versions.service';

@Controller('bible-versions')
export class BibleVersionsController {
  constructor(private readonly bibleVersionsService: BibleVersionsService) { }

  @Post()
  create(@Body() createBibleVersionDto: CreateBibleVersionDto) {
    return this.bibleVersionsService.create(createBibleVersionDto);
  }

  @Get()
  findAll() {
    return this.bibleVersionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bibleVersionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBibleVersionDto: UpdateBibleVersionDto) {
    return this.bibleVersionsService.update(+id, updateBibleVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bibleVersionsService.remove(+id);
  }
}
