import { ApiProperty } from '@nestjs/swagger'
import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ProductData } from './product.data'

@Entity('products')
export class Product extends ProductData {
    @ApiProperty({
        example: 1,
        description: "The generated product id"
    })
    @PrimaryGeneratedColumn()
    id: number
}
