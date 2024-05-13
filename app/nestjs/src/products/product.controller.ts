import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common'
import { CreateProductDto } from './dto/product-create.dto'
import {
    ProductService,
} from './product.service'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { ProductQueryParamsDto } from '@/products/dto/product-query-params.dto'

@ApiTags('Products')
@Controller('product')
export class ProductsController {
    constructor(private productService: ProductService) {}

    @ApiResponse({
        status: 200,
        description: 'Find product',
    })
    @Get()
    async find(@Query(new ValidationPipe()) queryParams: ProductQueryParamsDto) {
        return await this.productService.find(queryParams)
    }

    @ApiOperation({ summary: 'Create product' })
    @ApiBearerAuth()
    @ApiResponse({
        status: 201,
        description: 'Successfully create new product',
        type: CreateProductDto,
    })
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto)
    }
}
