import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateNewsImageDto } from '../../dtoes/new-images.dto/create-new-image.dto';
import { UpdateNewsImageDto } from '../../dtoes/new-images.dto/update-new-image.dto';
import { NewsImagesService } from '@/servers/new-images.server/new-images.service';

@Controller('newsImages')
export class NewsImagesController {
  constructor(private readonly newsImagesService: NewsImagesService) { }

  @Post()
  create(@Body() createNewsImageDto: CreateNewsImageDto) {
    return this.newsImagesService.create(createNewsImageDto);
  }

  @Get()
  async findAll(@Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string
  ) {
    return this.newsImagesService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewImageDto: UpdateNewsImageDto) {
    return this.newsImagesService.update(+id, updateNewImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsImagesService.remove(+id);
  }
}
