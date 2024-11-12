import { IsNotEmpty } from "class-validator";

export class CreateNewsImageDto {
    @IsNotEmpty({ message: 'Vui lòng chọn tin tức' })
    newsId: string;

    @IsNotEmpty({ message: 'Vui lòng nhập ảnh' })
    imgPath: string;

    @IsNotEmpty({ message: 'Vui lòng nhập chương' })
    number: string;
}
