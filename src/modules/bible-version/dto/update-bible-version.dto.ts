import { PartialType } from '@nestjs/mapped-types';
import { CreateBibleVersionDto } from './create-bible-version.dto';

export class UpdateBibleVersionDto extends PartialType(CreateBibleVersionDto) {}
