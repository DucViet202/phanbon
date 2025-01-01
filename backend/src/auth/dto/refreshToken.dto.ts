import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class RefreshTokenDto {

    @ApiProperty({
        description: 'Làm mới token',
        example: 'string'
    })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}