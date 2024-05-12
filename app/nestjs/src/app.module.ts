import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getTypeOrmConfig } from '@/config/typeorm.config'
import { DataSource } from 'typeorm'
import { RouterModule } from '@nestjs/core'
import { ProductModule } from '@/products/product.module'
import { apiRoutes } from '@/routes/api-route'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule,
                ProductModule,
                RouterModule.register(apiRoutes),
            ],
            inject: [ConfigService],
            useFactory: async () => await getTypeOrmConfig(),
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
