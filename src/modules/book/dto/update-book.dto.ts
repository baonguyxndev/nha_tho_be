import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateBookDto {
    @IsMongoId({ message: 'id không hợp lệ' })
    @IsNotEmpty({ message: 'id không được để trống!!!' })
    _id: string;

    @IsOptional()
    name: string;

    @IsOptional()
    @IsMongoId({ message: 'Phiên bản Kinh Thánh không tồn tại' })
    bibleVersionId: string;
}