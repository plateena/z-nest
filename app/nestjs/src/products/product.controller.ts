import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger'
import { Body, Controller, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common'
import { CreateProductDto } from './dto/product-create.dto'
import { ProductQueryParamsDto } from '@/products/dto/product-query-params.dto'
import { ProductService, } from './product.service'
import { UpdateProductDto } from './dto/product-update.dto'

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

    @ApiOperation({ summary: 'Update product' })
    @Put(':id')
    async update(@Param() id: number, @Body() updateProductDto: UpdateProductDto) {
        return await this.productService.updateProduct(id, updateProductDto)
    }
}
