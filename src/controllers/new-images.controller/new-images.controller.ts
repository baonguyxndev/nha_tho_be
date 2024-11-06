import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateNewImageDto } from '../../dtoes/new-images.dto/create-new-image.dto';
import { UpdateNewImageDto } from '../../dtoes/new-images.dto/update-new-image.dto';
import { NewImagesService } from '@/servers/new-images.server/new-images.service';

@Controller('new-images')
export class NewImagesController {
  constructor(private readonly newImagesService: NewImagesService) { }

  @Post()
  create(@Body() createNewImageDto: CreateNewImageDto) {
    return this.newImagesService.create(createNewImageDto);
  }

  @Get()
  findAll() {
    return this.newImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewImageDto: UpdateNewImageDto) {
    return this.newImagesService.update(+id, updateNewImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newImagesService.remove(+id);
  }
}
