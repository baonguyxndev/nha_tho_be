import { IsNotEmpty, IsEmail, IsMongoId } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty({ message: 'Vui lòng nhập tên' })
    name: string;

    @IsMongoId({ message: 'Phiên bản Kinh Thánh không tồn tại' })
    bibleVersionId: string;
}
