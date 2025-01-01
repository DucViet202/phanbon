import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  IsEmail,
  IsString,
  MaxLength,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class DeleteAdminDto {
  @ApiProperty({
    description: 'Tên của quản trị viên',
    example: '60e1d0b5d8f1f40015e4e8b0',
  })
  @IsString()
  @IsMongoId()
  id: string;
}
