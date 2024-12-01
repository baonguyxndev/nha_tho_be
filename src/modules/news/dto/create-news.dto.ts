import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto {
    @IsNotEmpty({ message: 'Vui lòng nhập tiêu đề' })
    title: string;

    @IsNotEmpty({ message: 'Vui lòng nhập mô tả' })
    desc: string;

    @IsNotEmpty({ message: 'Vui lòng nhập năm phụng vụ' })
    @IsMongoId({ message: 'Năm mục vụ không tồn tại' })
    ministryYearId: string;

    @IsNotEmpty({ message: 'Vui lòng nhập danh mục' })
    @IsMongoId({ message: 'Danh mục không tồn tại' })
    cateId: string;

    mainImg?: string;
}
