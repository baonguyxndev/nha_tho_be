import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateMinistryYearDto {
    @IsNotEmpty({ message: 'Vui lòng nhập tên' })
    name: string;

    @IsNotEmpty({ message: 'Vui lòng nhập mô tả' })
    desc: string;

    @IsNotEmpty({ message: 'Vui lòng chọn danh mục' })
    @IsMongoId({ message: 'Danh mục không tồn tại' })
    cateId: string;
}
