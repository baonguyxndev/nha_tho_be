import { IsNotEmpty, IsEmail, IsMongoId } from "class-validator";

export class CreateChapterDto {

    @IsNotEmpty({ message: 'Vui lòng nhập chương' })
    number: string;

    @IsMongoId({ message: 'Sách không tồn tại' })
    bookId: string;

}
