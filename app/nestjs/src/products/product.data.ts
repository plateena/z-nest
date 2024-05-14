import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { Entity, Column } from 'typeorm'

@Entity('products')
export class ProductData {
    @ApiProperty({
        description: "The product code",
        example: 1000
    })
    @Column()
    @IsNotEmpty()
    productCode: string

    @ApiProperty({
        description: "The product description",
        example: "Sedan"
    })
    @Column()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: "The product location",
        example: "West Malaysia"
    })
    @IsNotEmpty()
    @Column()
    location: string

    @ApiProperty({
        description: 'The product price',
        example: 100,
    })
    @IsNotEmpty()
    @IsNumber()
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number
}
