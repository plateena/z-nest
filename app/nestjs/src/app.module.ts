import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getTypeOrmConfig } from '@/config/typeorm.config'
import { DataSource } from 'typeorm'
import { RouterModule } from '@nestjs/core'
import { ProductModule } from '@/products/product.module'
import { apiRoutes } from '@/routes/api-route'
import { RoleMiddleware } from './middleware/role-middleware'
import { JwtModule } from '@nestjs/jwt'

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
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
            }),
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RoleMiddleware).forRoutes('*')
    }
    constructor(private dataSource: DataSource) {}
}
