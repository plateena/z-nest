import { Module } from "@nestjs/common";
import { ProductsController } from "@/products/product.controller";
import { ProductService } from "@/products/product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "@/products/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductService]
})
export class ProductModule {}
