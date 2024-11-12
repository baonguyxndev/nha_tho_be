import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'Vui lòng nhập tên danh mục' })
    name: string;
}
