import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateVerseDto {

    @IsNotEmpty({ message: 'Vui lòng nhập chương' })
    @IsMongoId({ message: 'Chương không tồn tại' })
    chapterId: string;

    @IsNotEmpty({ message: 'Vui lòng nhập đoạn số mấy' })
    number: string;

    @IsNotEmpty({ message: 'Vui lòng nhập mô tả ' })
    desc: string;
}
