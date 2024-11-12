import { IsNotEmpty } from "class-validator";

export class CreateNewsDto {
    @IsNotEmpty({ message: 'Vui lòng nhập tiêu đề' })
    title: string;

    @IsNotEmpty({ message: 'Vui lòng nhập mô tả' })
    desc: string;

    @IsNotEmpty({ message: 'Vui lòng nhập năm phụng vụ' })
    ministryYearId: string;

    @IsNotEmpty({ message: 'Vui lòng nhập danh mục' })
    cateId: string;

    @IsNotEmpty({ message: 'Vui lòng nhập ảnh chính' })
    mainImg: string;
}
