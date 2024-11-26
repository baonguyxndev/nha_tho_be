import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BibleVersionsService } from '@/modules/bible-version/service/bible-versions.service';
import { CreateBibleVersionDto } from '../dto/create-bible-version.dto';
import { UpdateBibleVersionDto } from '../dto/update-bible-version.dto';
import { Public } from '@/decorator/customize';

@Controller('bible-versions')
export class BibleVersionsController {
  constructor(private readonly bibleVersionsService: BibleVersionsService) { }

  @Post()
  create(@Body() createBibleVersionDto: CreateBibleVersionDto) {
    return this.bibleVersionsService.create(createBibleVersionDto);
  }

  @Get()
  async findAll(@Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string
  ) {
    return this.bibleVersionsService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bibleVersionsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateBibleVersionsDto: UpdateBibleVersionDto) {
    return this.bibleVersionsService.update(updateBibleVersionsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bibleVersionsService.remove(id);
  }
}
