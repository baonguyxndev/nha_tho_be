import { PartialType } from '@nestjs/mapped-types';
import { CreateMinistryYearDto } from './create-ministry-year.dto';

export class UpdateMinistryYearDto extends PartialType(CreateMinistryYearDto) {}
