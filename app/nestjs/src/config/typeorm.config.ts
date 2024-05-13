import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Product } from '@/products/product.entity'

export const getTypeOrmConfig = async (): Promise<TypeOrmModuleOptions> => {
    const isTest = process.env.NODE_ENV === 'test'

    if (isTest) {
        return {
            type: process.env.DB_CONNECTION as 'postgres' | 'mysql',
            host: 'db-test',
            port: 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: 'NESTJS_TEST',
            entities: [Product],
            synchronize: true,
        }
    }

    return {
        name: 'production',
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
