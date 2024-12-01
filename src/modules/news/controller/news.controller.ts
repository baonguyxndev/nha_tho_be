import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NewsService } from '@/modules/news/service/news.service';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';
import { multerOptions } from '@/middleware/multer/cloudinary.middleware'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('mainImg', multerOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createNewsDto: CreateNewsDto,
  ) {
    createNewsDto.mainImg = file.path;
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

  @Patch()
  @UseInterceptors(FileInterceptor('mainImg', multerOptions))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    // Kiểm tra nếu có file hình ảnh mới thì cập nhật lại hình ảnh
    if (file) {
      updateNewsDto.mainImg = file.path;
    }

    // Cập nhật tin tức
    return this.newsService.update(updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
