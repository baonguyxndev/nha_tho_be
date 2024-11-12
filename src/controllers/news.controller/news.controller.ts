import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { CreateNewsDto } from '../../dtoes/news.dto/create-news.dto';
import { UpdateNewsDto } from '../../dtoes/news.dto/update-news.dto';
import { NewsService } from '@/servers/news.server/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  async findAll(@Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string
  ) {
    return this.newsService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
