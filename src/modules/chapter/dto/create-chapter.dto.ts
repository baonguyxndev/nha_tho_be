import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateChapterDto {

    @IsNotEmpty({ message: 'Vui lòng nhập chương' })
    number: string;

    @IsNotEmpty({ message: 'Vui lòng chọn sách' })
    bookId: string;

}
