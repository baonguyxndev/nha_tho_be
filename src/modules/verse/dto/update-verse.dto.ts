import { PartialType } from '@nestjs/mapped-types';
import { CreateVerseDto } from './create-verse.dto';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateVerseDto {

    @IsMongoId({ message: 'id không hợp lệ' })
    @IsNotEmpty({ message: 'id không được để trống!!!' })
    id: string;

    @IsOptional()
    chapterId: string;

    @IsOptional()
    number: string;

    @IsOptional()
    desc: string;

}