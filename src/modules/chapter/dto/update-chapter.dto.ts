import { PartialType } from '@nestjs/mapped-types';
import { CreateChapterDto } from './create-chapter.dto';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateChapterDto {
    @IsMongoId({ message: 'id không hợp lệ' })
    @IsNotEmpty({ message: 'id không được để trống!!!' })
    _id: string;

    @IsOptional()
    number: string;

    @IsOptional()
    bookId: string;
}