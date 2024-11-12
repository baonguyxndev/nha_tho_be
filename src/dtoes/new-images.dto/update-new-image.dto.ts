import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsImageDto } from './create-new-image.dto';

export class UpdateNewsImageDto extends PartialType(CreateNewsImageDto) { }
