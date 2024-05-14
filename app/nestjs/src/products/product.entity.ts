import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductData } from './product.data';

@Entity('products')
export class Product extends ProductData {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the product',
    })
    @PrimaryGeneratedColumn()
    id: number;
}
