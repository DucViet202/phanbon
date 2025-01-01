import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, IsEnum, IsNumber, IsEmail, Length, IsArray } from "class-validator";

export class addUserDto {

    @ApiProperty({
        description: 'Tên người dùng',
        example: 'Nguyen Van A'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    userName: string;

    @ApiProperty({
        description: 'Trạng thái',
        example: 'active'
    })
    @IsString()
    @IsOptional()
    @IsEnum(['active', 'inactive'])
    status: string;

    @ApiProperty({
        description: 'Địa chỉ của người dùng',
        example: '720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh 72300'
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    userAddress: string;

    @ApiProperty({
        description: 'SĐT người dùng',
        example: '0901234567'
    })
    @IsString()
    @IsOptional()
    @Length(10, 10)
    userPhone: string;

    @ApiProperty({
        description: 'Email của người dùng',
        example: 'xx@gmail.com',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    @MaxLength(50)
    userEmail: string;

    @ApiProperty({
        description: 'ID hóa đơn bán hàng liên kết với người dùng',
        example: ['66daefe5ed7d52a461674576'],
        required: false,
    })
    @IsArray()
    @IsOptional()
    listSaleinvoice: string[];

}

export class updateUserDto {


    @ApiProperty({
        description: 'Tên người dùng',
        example: 'Nguyen Van A'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    userName: string;

    @ApiProperty({
        description: 'Trạng thái',
        example: 'active'
    })
    @IsString()
    @IsOptional()
    @IsEnum(['active', 'inactive'])
    status: string;

    @ApiProperty({
        description: 'Địa chỉ của người dùng',
        example: '720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh 72300'
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    userAddress: string;

    @ApiProperty({
        description: 'SĐT người dùng',
        example: '0901234567'
    })
    @IsString()
    @IsOptional()
    @Length(10, 10)
    userPhone: string;

    @ApiProperty({
        description: 'Email của người dùng',
        example: 'xx@gmail.com',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    @MaxLength(50)
    userEmail: string;

    @ApiProperty({
        description: 'ID hóa đơn bán hàng liên kết với người dùng',
        example: ['66daefe5ed7d52a461674576'],
        required: false,
    })
    @IsArray()
    @IsOptional()
    listSaleinvoice: string[];

}