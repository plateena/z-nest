import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    description: string

    @Column()
    location: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number
}
