import { ApiProperty } from "@nestjs/swagger";
import { IsDate, MinLength, IsEmail, IsNotEmpty, IsString, MaxLength, Matches } from "class-validator";

export class ForgotPasswordDto {

    @ApiProperty({
        description: 'Email của người dùng ',
        example: 'nguyenducviet@gmail.com'
    })
    @IsString()
    @IsNotEmpty({ message: 'Email is required' })
    @MaxLength(100)
    @IsEmail({}, { message: 'please enter correct email' })
    email: string;




}