import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: 'Vui lòng nhập email của bạn' })
    email: string;

    @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
    password: string;
}
