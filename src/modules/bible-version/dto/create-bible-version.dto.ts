import { IsNotEmpty } from "class-validator";

export class CreateBibleVersionDto {

    @IsNotEmpty({ message: 'Vui lòng nhập tên' })
    name: string;
}
