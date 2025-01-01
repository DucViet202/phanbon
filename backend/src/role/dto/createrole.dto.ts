import { ApiProperty } from "@nestjs/swagger";
import { IsDate, MinLength, IsEmail, IsNotEmpty, IsString, MaxLength, Matches, IsNumber, ArrayNotEmpty, IsArray, ArrayMinSize } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    description: 'Tên của vai trò ',
    example: 'admin'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Id các quyền đã phân cho vai trò ',
    example: [0, 1, 2],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  permissionID: number[];
}