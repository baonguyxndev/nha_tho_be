import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
    @IsMongoId({ message: 'id không hợp lệ' })
    @IsNotEmpty({ message: 'id không được để trống!!!' })
    _id: string;

    @IsOptional()
    name: string;
}