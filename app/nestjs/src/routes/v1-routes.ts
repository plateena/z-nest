import { ProductModule } from "@/products/product.module";
import { TokenModule } from "@/token/token.module";
import { Routes } from "@nestjs/core";

export const v1Routes: Routes = [
    {
        path: '/v1',
        children: [
            {
                path: '/auth',
                module: TokenModule
            },
            {
                path: '/product',
                module: ProductModule
            },
        ]
    }
]

