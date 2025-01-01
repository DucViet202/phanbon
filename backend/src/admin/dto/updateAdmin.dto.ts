import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  IsEmail,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({
    description: 'Id của quản trị viên',
    example: '60e1d0b5d8f1f40015e4e8b0',
  })
  @IsString()
  id: string;
  @ApiProperty({
    description: 'Tên của quản trị viên',
    example: 'Admin1',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  nameAdmin: string;

  @ApiProperty({
    description: 'Email của quản trị viên',
    example: 'admin1@gmail.com',
  })
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  userName: string;

  @ApiProperty({
    description: 'Mật khẩu của quản trị viên',
    example: 'Admin@123',
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @ApiProperty({
    description: 'Vai trò của quản trị viên',
    example: ['66445e3ad052f97add5912c1', '66445e3ad052f97add5912c1'],
  })
  @IsOptional()
  roleId: string[];
}
