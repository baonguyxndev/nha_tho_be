import { IsNotEmpty } from "class-validator";

export class ChangePasswordAuthDto {

    @IsNotEmpty({ message: 'Vui lòng nhập mã code đã được gửi về email của bạn' })
    code: string;

    @IsNotEmpty({ message: 'Vui lòng nhập email của bạn' })
    email: string;

    @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu mới' })
    newPassword: string;

    @IsNotEmpty({ message: 'Vui lòng nhập xác nhận mật khẩu mới' })
    confirmNewPassword: string;
}