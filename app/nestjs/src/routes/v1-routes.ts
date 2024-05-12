import { ProductModule } from "@/products/product.module";
import { Routes } from "@nestjs/core";

export const v1Routes: Routes = [
    {
        path: '/v1',
        children: [
            {
                path: '/',
                module: ProductModule
            }
        ]
    }
]

