import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Repository } from 'typeorm'
import { PageDataDto } from '@/page.dto'

export interface IProductData {
    code: string
    description: string
    location: string
    price: number
}
export interface IProductObj extends IProductData {
    id: number
}

export interface IPaginationQueryParams {
    page?: number
    perPage?: number
}

export interface IProductQueryParams extends IPaginationQueryParams {
    filter?: {
        code?: string
        location?: string
    }
    'filter[code]'?: string
    'filter[location]'?: string
}

export interface IQueryBuilderObj {
    skip?: number
    take?: number
    page?: number
    where?: {
        location?: string
        code?: string
    }
}

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        public readonly productRepository: Repository<Product>,
    ) {}

    async find(queryParams?: IProductQueryParams) {
        let query: IQueryBuilderObj = {}

        query = setPaginationQueryBuilder(query, queryParams)

        if (queryParams?.filter?.code) {
            createWhere(query)
            query.where.code = queryParams.filter.code
        }

        if (queryParams?.filter?.location) {
            createWhere(query)
            query.where.location = queryParams.filter.location
        }

        const [data, total] = await this.productRepository.findAndCount(query)
        return new PageDataDto<Product>(data, total, query)
    }

    async create(productData: IProductData): Promise<Product> {
        const product = this.productRepository.create(productData)
        return this.productRepository.save(product)
    }
}

const setPaginationQueryBuilder = (
    query: IQueryBuilderObj,
    queryParams: IProductQueryParams,
): IQueryBuilderObj => {
    if (queryParams?.page) {
        query.page = queryParams.page
        query.skip = queryParams.page - 1
        query.take = queryParams.perPage || 5
    }

    return query
}

const createWhere = (query: IQueryBuilderObj): IQueryBuilderObj => {
    if (!query.where) {
        query.where = {}
    }
    return query
}
