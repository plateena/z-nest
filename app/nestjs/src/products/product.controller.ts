import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateProductDto } from "./dto/product-create.dto";

@Controller('product')
export class ProductsController {
    @Get()
    find() {
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return 'test'
    }
}
