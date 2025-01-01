import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, IsEnum, IsNumber } from "class-validator";

export class approveDto {
    @ApiProperty({
        description: 'ID của hóa đơn mua hàng',
        example: '66dada5875dc7a02ef98e54b'
    })
    @IsString()
    @IsNotEmpty()
    purchaseInvoiceId: string;


    @ApiProperty({
        description: 'Duyệt hóa đơn mua hàng',
        example: 'rejected'
    })
    @IsString()
    @IsOptional()
    @IsEnum(['approved', 'rejected'])
    approveStatus: string;
    static approveStatus: string;



}
