import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VersesService } from '@/modules/verse/service/verses.service';
import { CreateVerseDto } from '../dto/create-verse.dto';
import { UpdateVerseDto } from '../dto/update-verse.dto';

@Controller('verses')
export class VersesController {
  constructor(private readonly versesService: VersesService) { }

  @Post()
  create(@Body() createVerseDto: CreateVerseDto) {
    return this.versesService.create(createVerseDto);
  }

  @Get()
  async findAll(@Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string
  ) {
    return this.versesService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versesService.findOne(+id);
  }

  @Patch()
  update(@Body() updateVerseDto: UpdateVerseDto) {
    return this.versesService.update(updateVerseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versesService.remove(id);
  }
}
