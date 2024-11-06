import { PartialType } from '@nestjs/mapped-types';
import { CreateNewImageDto } from './create-new-image.dto';

export class UpdateNewImageDto extends PartialType(CreateNewImageDto) {}
