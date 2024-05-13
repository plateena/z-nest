import { Injectable, Req } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Repository } from 'typeorm'
import { PageDto } from '@/page.dto'
import { Router } from 'express'

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
    'filter[code]'?: string
    'filter[location]'?: string
}

export interface IQueryBuilderObj {
    skip?: number
    take?: number
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

    async find(@Req() queryParams?: IProductQueryParams) {
        let query: IQueryBuilderObj = {}

        query = setPaginationQueryBuilder(query, queryParams)

        if (queryParams && queryParams['filter[code]']) {
            createWhere(query)
            query.where.code = queryParams['filter[code]']
        }

        if (queryParams && queryParams['filter[location]']) {
            createWhere(query)
            query.where.location = queryParams['filter[location]']
        }

        const [data, total] = await this.productRepository.findAndCount(query)
        return new PageDto<Product>(data, total, query)
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
        let offset = (queryParams.page - 1) * (queryParams.perPage || 5)
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
