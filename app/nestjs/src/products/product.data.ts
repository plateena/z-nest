import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('products')
export class ProductData {
    @ApiProperty({
        description: "The product code",
        example: 1000
    })
    @Column()
    code: string

    @ApiProperty({
        description: "The product description",
        example: "Sedan"
    })
    @Column()
    description: string

    @ApiProperty({
        description: "The product location",
        example: "West Malaysia"
    })
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
