import { ApiProperty } from "@nestjs/swagger";
import { IsDate, MinLength, IsEmail, IsNotEmpty, IsString, MaxLength, Matches, IsMongoId } from "class-validator";

export class BlockAdminDto {
    @ApiProperty({
        description: 'Id của quản trị viên',
        example: '66445e3ad052f97add5912c1'
    })
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    id: string;

    @ApiProperty({
        description: 'Trạng thái chặn của quản trị viên',
        example: 'true'
    })
    @IsNotEmpty()
    isBlock: boolean;

}