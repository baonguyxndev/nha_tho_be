import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateNewsDto {
    @IsMongoId({ message: 'id không hợp lệ' })
    @IsNotEmpty({ message: 'id không được để trống!!!' })
    _id: string;

    @IsOptional()
    title: string;

    @IsOptional()
    desc: string;

    @IsOptional()
    @IsMongoId({ message: 'Năm mục vụ không tồn tại' })
    ministryYearId: string;

    @IsOptional()
    @IsMongoId({ message: 'Danh mục không tồn tại' })
    cateId: string;

    mainImg?: string;
}