import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, IsEnum, IsNumber } from "class-validator";

export class addProductDto {

    @ApiProperty({
        description: 'ID danh mục liên kết với sản phẩm',
        example: '60d21bb67c1b2c001f6472d4',
    })
    @IsMongoId()
    @IsOptional()
    categoryId: string;

    @ApiProperty({
        description: 'Tên sản phẩm',
        example: 'Phân bón vi sinh'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    productName: string;

    @ApiProperty({
        description: 'Mô tả sản phẩm',
        example: 'Abc',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    describeProduct: string;

    @ApiProperty({
        description: 'Trạng thái',
        example: 'show'
    })
    @IsString()
    @IsOptional()
    @IsEnum(['show', 'hidden'])
    status: string;

    @ApiProperty({
        description: 'Đơn vị sản phẩm',
        example: 'kg'
    })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    unit: string;

    @ApiProperty({
        description: 'Giá nhập hàng',
        example: '100000'
    })
    @IsNumber()
    @IsOptional()
    purchasePrice: number;

    @ApiProperty({
        description: 'Giá bán hàng',
        example: '120000'
    })
    @IsNumber()
    @IsOptional()
    salePice: number;

}

export class updateProductDto {

    @ApiProperty({
        description: 'ID danh mục liên kết với sản phẩm',
        example: '60d21bb67c1b2c001f6472d4',
        required: false,
    })
    @IsMongoId()
    @IsOptional()
    categoryId: string;

    @ApiProperty({
        description: 'Tên sản phẩm',
        example: 'Phân bón',
        required: false, // Đảm bảo thuộc tính này là tùy chọn trong quá trình cập nhật
    })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    productName: string;

    @ApiProperty({
        description: 'Mô tả sản phẩm',
        example: 'Abc',
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    describeProduct: string;

    @ApiProperty({
        description: 'Trạng thái',
        example: 'show',
        required: false, // Đảm bảo thuộc tính này là tùy chọn trong quá trình cập nhật
    })
    @IsString()
    @IsOptional()
    @IsEnum(['show', 'hidden'])
    status: string;

    @ApiProperty({
        description: 'Đơn vị sản phẩm',
        example: 'kg',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    unit: string;

    @ApiProperty({
        description: 'Giá nhập hàng',
        example: '100000',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    purchasePrice: number;

    @ApiProperty({
        description: 'Giá bán hàng',
        example: '100000',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    salePice: number;
}