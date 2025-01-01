import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, IsEnum, IsNumber } from "class-validator";

export class CreateWarehouseDto {

    @ApiProperty({
        description: 'Tên kho',
        example: 'Kho 1'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    wareHouseName: string;

    @ApiProperty({
        description: 'ID sản phẩm liên kết với sản phẩm',
        example: '60d21bb67c1b2c001f6472d4',
    })
    @IsMongoId()
    @IsOptional()
    productId: string;

    @ApiProperty({
        description: 'Mô tả kho',
        example: 'Abcdsa',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    describeWareHouse: string;

    @ApiProperty({
        description: 'Số lượng sản phẩm tối thiểu',
        example: 0
    })
    @IsNumber()
    @IsOptional()
    quantityMin: number;

    @ApiProperty({
        description: 'Số lượng sản phẩm tối đa',
        example: 1000
    })
    @IsNumber()
    @IsOptional()
    quantityMax: number;

    @ApiProperty({
        description: 'Số lượng sản phẩm hiện tại',
        example: 0
    })
    @IsNumber()
    @IsOptional()
    quantityNow: number;

    @ApiProperty({
        description: 'Trạng thái',
        example: 'show'
    })
    @IsString()
    @IsOptional()
    @IsEnum(['show', 'hidden'])
    status: string;
}


export class importWarehouseDto {

    @ApiProperty({
        description: 'Ngày sản xuất',
        example: new Date('2021-06-23T00:00:00.000Z')
    })
    @IsDate()
    @IsOptional()
    productionDate: Date;

    @ApiProperty({
        description: 'Ngày hết hạn của sản phẩm',
        example: new Date('2024-06-23T00:00:00.000Z')
    })
    @IsDate()
    @IsOptional()
    expiry: Date;

    @ApiProperty({
        description: 'Mã hóa đơn mua hàng',
        example: '60d21bb67c1b2c001f6472d4'
    })
    @IsMongoId()
    @IsOptional()
    purchaseInvoiceId: string;
}