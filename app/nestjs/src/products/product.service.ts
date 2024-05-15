import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { PageDataDto } from '@/page.dto';
import { setQueryPagination } from '@/utils/set-query-pagination';
import { UpdateProductDto } from './dto/product-update.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        public readonly productRepository: Repository<Product>,
    ) {}

    async find(queryParams?: IProductQueryParams): Promise<PageDataDto<Product>> {
        let query: IQueryBuilderObj = {};

        // Set pagination query
        query = setQueryPagination(query, queryParams);

        if (queryParams?.productCode) {
            createWhere(query);
            query.where.productCode = queryParams.productCode;
        }

        if (queryParams?.location) {
            createWhere(query);
            query.where.location = queryParams.location;
        }

        const [data, total] = await this.productRepository.findAndCount(query);

        // Return data with pagination information
        return new PageDataDto<Product>(data, total, query);
    }

    async create(productData: IProductData): Promise<Product> {
        const product = this.productRepository.create(productData);
        return this.productRepository.save(product);
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOneBy({id});
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        return this.productRepository.save({ ...product, ...updateProductDto });
    }

    async deleteProduct(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
}

const createWhere = (query: IQueryBuilderObj): void => {
    if (!query.where) {
        query.where = {};
    }
};
