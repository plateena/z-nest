import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductData {
    @ApiProperty({
        description: 'The product ID',
        example: 1,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The product code',
        example: '1000',
    })
    @Column()
    @IsNotEmpty()
    @IsString()
    productCode: string;

    @ApiProperty({
        description: 'The product description',
        example: 'Sedan',
    })
    @Column()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The product location',
        example: 'West Malaysia',
    })
    @Column()
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({
        description: 'The product price',
        example: 100,
    })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0, { message: 'Price must be a positive number' })
    price: number;
}
