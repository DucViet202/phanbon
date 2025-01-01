import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsEmail,
  IsEnum,
  IsNumber,
  Length,
  IsObject,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class CreatePurchaseInvoiceDto {

  @ApiProperty({
    description: 'ID danh mục gắn với sản phẩm',
    example: '60d21bb67c1b2c001f6472d4',
  })
  @IsMongoId()
  @IsOptional()
  categoryId: string;

  @ApiProperty({
    description: 'ID nhà cung cấp liên kết với hóa đơn mua hàng',
    example: '60d21bb67c1b2c001f6472d4',
  })
  @IsMongoId()
  @IsOptional()
  supplierId: string;

  @ApiProperty({
    description: 'ID quản trị viên liên kết với hóa đơn mua hàng',
    example: '66d5da30e5dd7c9cd9cd1208',
  })
  @IsMongoId()
  @IsOptional()
  adminId: string;

  @ApiProperty({
    description: 'Danh sách sản phẩm đã mua',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        productId: { type: 'string', example: '60d21bb67c1b2c001f6472d4' },
        quantity: { type: 'number', example: 10 },
      },
    },
    example: [
      {
        productId: '60d21bb67c1b2c001f6472d4',
        quantity: 10,
      },
    ],
  })
  @IsArray()
  @Type(() => Object) // Chỉ định rằng các phần tử trong mảng là đối tượng
  purchaseProducts: { productId: string; quantity: number }[];

  @ApiProperty({
    description: 'Trạng thái hóa đơn mua hàng',
    example: 'payed',
  })
  @IsString()
  @IsOptional()
  @IsEnum(['payed', 'prepay'])
  status: string;

  @ApiProperty({
    description: 'Số tiền đã trả cho hóa đơn mua hàng',
    example: '1',
  })
  @IsNumber()
  @IsOptional()
  paidAmount: number;

  @ApiProperty({
    description: 'Số tiền thanh toán cho hóa đơn mua hàng',
    example: '1',
  })
  @IsNumber()
  @IsOptional()
  amountOwed: number;

  @ApiProperty({
    description: 'Thời hạn vay của hóa đơn mua hàng',
    example: '30',
  })
  @IsNumber()
  @IsOptional()
  paymentTems: number;

  @ApiProperty({
    description: 'Trạng thái duyệt hóa đơn mua hàng',
    example: 'pending',
  })
  @IsString()
  @IsOptional()
  @IsEnum(['approved', 'rejected', 'pending'])
  approveStatus: string;
}


export class updatePurchaseInvoiceDto {
  @ApiProperty({
    description: 'Trạng thái hóa đơn mua hàng',
    example: 'prepay',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(['payed', 'prepay'])
  status: string;

  @ApiProperty({
    description: 'Số tiền đã thanh toán cho hóa đơn mua hàng',
    example: '0',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  paidAmount: number;

  @ApiProperty({
    description: '"Số tiền đã trả cho hóa đơn mua hàng',
    example: '0',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  amountOwed: number;

  @ApiProperty({
    description: 'Thanh toán thêm cho hóa đơn mua hàng',
    example: '5',
  })
  @IsNumber()
  @IsOptional()
  payExtra: number;

}