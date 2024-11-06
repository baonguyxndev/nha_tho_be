import { Injectable } from '@nestjs/common';
import { CreateNewImageDto } from '../../dtoes/new-images.dto/create-new-image.dto';
import { UpdateNewImageDto } from '../../dtoes/new-images.dto/update-new-image.dto';

@Injectable()
export class NewImagesService {
  create(createNewImageDto: CreateNewImageDto) {
    return 'This action adds a new newImage';
  }

  findAll() {
    return `This action returns all newImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} newImage`;
  }

  update(id: number, updateNewImageDto: UpdateNewImageDto) {
    return `This action updates a #${id} newImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} newImage`;
  }
}
