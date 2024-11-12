import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty({ message: 'Vui lòng nhập tên' })
    name: string;

    bibleVerionId: string;
}
