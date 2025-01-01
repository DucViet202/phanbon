import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, MinLength, IsEmail, IsNotEmpty, IsString, MaxLength, Matches, Min } from "class-validator";

export class LoginDto {

    @ApiProperty({
        description: 'Nhập tên người dùng',
        example: 'admin'
    })
    @IsString()
    @MaxLength(80)
    @MinLength(3)
    @Transform(({ value }) => value.toLowerCase())
    account: string;

    @ApiProperty({
        description: 'Nhập mật khẩu',
        example: 'Admin@123'
    })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MaxLength(80)

    password: string;


}