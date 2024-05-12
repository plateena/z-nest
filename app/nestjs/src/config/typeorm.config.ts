import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Product } from '@/products/product.entity'

export const getTypeOrmConfig = async (): Promise<TypeOrmModuleOptions> => {
    return {
        type: process.env.DB_CONNECTION as 'postgres' | 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Product],
        synchronize: true,
    }
}
