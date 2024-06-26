import { Body, Controller, Get, Param, Post, Put, Query, ValidationPipe, ParseIntPipe, UseGuards, Delete, } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger'
import { CreateProductDto } from './dto/product-create.dto'
import { ProductQueryParamsDto } from '@/products/dto/product-query-params.dto'
import { ProductService } from './product.service'
import { UpdateProductDto } from './dto/product-update.dto'
import { RolesGuard } from '@/guards/role.guards'
import { Roles } from '@/decorators/role.decorator'

@ApiTags('Products')
@UseGuards(RolesGuard)
@Controller()
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

    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Create product' })
    @Roles('admin')
    @ApiResponse({
        status: 201,
        description: 'Successfully created new product',
        type: CreateProductDto,
    })
    @Roles('admin')
    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productService.create(createProductDto)
    }

    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update product' })
    @Roles('admin')
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

    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Delete product" })
    @Roles('admin')
    @Delete(":id")
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.deleteProduct(id)
    }

}
