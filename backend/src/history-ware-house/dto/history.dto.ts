import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
  IsArray,
  IsDataURI,
} from 'class-validator';

export class HistoryDto {

  @ApiProperty({
    description: 'Ngày cập nhập',
    example: '2021-09-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  updatedAt: string;

  @ApiProperty({
    description: 'ID hóa đơn mua hàng',
    example: '612f3e5e5f3b3b001f3b3b3b',
  })
  @IsMongoId()
  @IsNotEmpty()
  purchaseInvoiceId: string;


}
