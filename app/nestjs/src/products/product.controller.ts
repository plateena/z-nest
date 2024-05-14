import { Body, Controller, Get, Param, Post, Put, Query, ValidationPipe, ParseIntPipe, } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger'
import { CreateProductDto } from './dto/product-create.dto'
import { ProductQueryParamsDto } from '@/products/dto/product-query-params.dto'
import { ProductService } from './product.service'
import { UpdateProductDto } from './dto/product-update.dto'

@ApiTags('Products')
@Controller('product')
export class ProductsController {
    constructor(private productService: ProductService) {}

    @ApiResponse({
        status: 200,
        description: 'Find products',
    })
    @Get()
    async find(
        @Query(new ValidationPipe()) queryParams: ProductQueryParamsDto,
    ) {
        return await this.productService.find(queryParams)
    }

    @ApiOperation({ summary: 'Create product' })
    @ApiBearerAuth()
    @ApiResponse({
        status: 201,
        description: 'Successfully created new product',
        type: CreateProductDto,
    })
    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productService.create(createProductDto)
    }

    @ApiOperation({ summary: 'Update product' })
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return await this.productService.updateProduct(id, updateProductDto)
    }

    @ApiOperation({ summary: 'View product' })
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.findOne(id)
    }
}
