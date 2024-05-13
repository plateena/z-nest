import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateProductDto } from "./dto/product-create.dto";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductsController {
    constructor(private productService: ProductService) {}

    @Get()
    find() {
        return this.productService.find()
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto)
    }
}
