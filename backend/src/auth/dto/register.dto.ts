import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, MinLength, IsEmail, IsNotEmpty, IsString, MaxLength, Matches } from "class-validator";

export class RegisterDto {


    @ApiProperty({
        description: 'Họ và tên người dùng ',
        example: 'Nguyễn Đức Việt'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    username: string;

    @ApiProperty({
        description: 'Họ và tên đệm người dùng',
        example: 'Nguyên Đức'
    })
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({
        description: 'Tên người dùng',
        example: 'Việt'
    })
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({
        description: 'Email của người dùng ',
        example: 'xuanchimto@gmail.com'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @IsEmail({}, { message: 'please enter correct email' })
    email: string;

    @ApiProperty({
        description: 'Mật khẩu của người dùng ',
        example: 'Xuanchimto123'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;



}