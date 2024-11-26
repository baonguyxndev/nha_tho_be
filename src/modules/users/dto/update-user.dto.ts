import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {

    @IsMongoId({ message: 'id không hợp lệ' })
    @IsNotEmpty({ message: 'id không được để trống!!!' })
    id: string;

    @IsOptional()
    name: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    image: string;

    @IsOptional()
    role: string;
}
