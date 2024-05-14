import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Repository } from 'typeorm'
import { PageDataDto } from '@/page.dto'
import { setQueryPagination } from '@/utils/set-query-pagination'
import { ProductData } from './product.data'
import { UpdateProductDto } from './dto/product-update.dto'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        public readonly productRepository: Repository<Product>,
    ) {}

    async find(queryParams?: IProductQueryParams) {
        let query: IQueryBuilderObj = {}

        // set the pagination quer
        query = setQueryPagination(query, queryParams)

        if (queryParams?.filter?.code) {
            createWhere(query)
            query.where.code = queryParams.filter.code
        }

        if (queryParams?.filter?.location) {
            createWhere(query)
            query.where.location = queryParams.filter.location
        }

        const [data, total] = await this.productRepository.findAndCount(query)

        // return with pageination data
        return new PageDataDto<Product>(data, total, query)
    }

    async create(productData: IProductData): Promise<Product> {
        const product = this.productRepository.create(productData)
        return this.productRepository.save(product)
    }

    async findOne(id: number): Promise<Product> {
        return await this.productRepository.findOneBy({ id })
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product | Boolean> {
        let original = await this.productRepository.findOneBy({ id })

        if(!original) {
            throw new NotFoundException('Product not found')
        }

        return await this.productRepository.save({
            ...original,
            ...updateProductDto,
        })
    }
}

const createWhere = (query: IQueryBuilderObj): IQueryBuilderObj => {
    if (!query.where) {
        query.where = {}
    }
    return query
}
