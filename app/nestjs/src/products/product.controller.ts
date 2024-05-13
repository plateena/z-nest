import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateProductDto } from './dto/product-create.dto'
import { ProductService } from './product.service'
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'

@ApiTags('Products')
@Controller('product')
export class ProductsController {
    constructor(private productService: ProductService) {}

    @ApiResponse({
        status: 200,
        description: 'Find product',
    })
    @Get()
    async find() {
        return await this.productService.find()
    }

    @ApiOperation({ summary: 'Create product' })
    @ApiBearerAuth()
    @ApiResponse({
        status: 201,
        description: 'Successfully create new product',
        type: CreateProductDto
    })
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto)
    }
}
