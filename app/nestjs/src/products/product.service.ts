import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Repository } from 'typeorm'
import { PageDto } from '@/page.dto'

export interface IProductData {
    code: string
    description: string
    location: string
    price: number
}
export interface IProductObj extends IProductData {
    id: number
}

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async find() {
        let page = 2
        let perPage = 2

        let offset = (page - 1) * perPage
        const [ data , total ] = await this.productRepository
            .createQueryBuilder()
            .offset(offset)
            .limit(perPage)
            .getManyAndCount()

        return new PageDto<Product>(data , total)
    }

    async create(productData: IProductData): Promise<Product> {
        const product = this.productRepository.create(productData)
        return this.productRepository.save(product)
    }
}
