import { IsNotEmpty } from "class-validator";

export class CodeAuthDto {

    @IsNotEmpty({ message: '_id null' })
    _id: string;

    @IsNotEmpty({ message: 'Vui lòng nhập mã code đã được gửi về email của bạn' })
    code: string;
}