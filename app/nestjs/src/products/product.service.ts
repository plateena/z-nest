import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Repository } from 'typeorm'

export interface ProductData {
    code: string
    description: string
    location: string
    price: number
}
export interface ProductObj extends ProductData {
    id: number
}

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async find() {
        return this.productRepository.find()
    }

    async create(productData: ProductData): Promise<Product> {
        const product = this.productRepository.create(productData)
        return this.productRepository.save(product)
    }
}
