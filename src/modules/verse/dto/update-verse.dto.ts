import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateVerseDto {

    @IsMongoId({ message: 'id không hợp lệ' })
    @IsNotEmpty({ message: 'id không được để trống!!!' })
    _id: string;

    @IsOptional()
    @IsMongoId({ message: 'Chương không tồn tại' })
    chapterId: string;

    @IsOptional()
    number: string;

    @IsOptional()
    desc: string;

}