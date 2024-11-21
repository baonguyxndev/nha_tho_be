import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: 'tên không được để trống!!!' })
  name: string;

  @IsNotEmpty({ message: 'email không được để trống!!!' })
  @IsEmail({}, { message: 'email không đúng định dạng!!!' })
  email: string;

  @IsNotEmpty({ message: 'mật khẩu không được để trống!!!' })
  @IsStrongPassword({}, { message: 'mật khẩu phải bao gồm ký tự đặc biệt, chữ in hoa, chữ số, chữ thường và nhiều có hơn 6 ký tự!!!' })
  password: string;

  @IsNotEmpty({ message: 'số điện thoại không được để trống!!!' })
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  image: string;
}
