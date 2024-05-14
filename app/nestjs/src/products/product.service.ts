import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Repository } from 'typeorm'
import { PageDataDto } from '@/page.dto'
import { setQueryPagination } from '@/utils/set-query-pagination'

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
}

const createWhere = (query: IQueryBuilderObj): IQueryBuilderObj => {
    if (!query.where) {
        query.where = {}
    }
    return query
}
