import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getTypeOrmConfig } from '@/config/typeorm.config'
import { DataSource } from 'typeorm'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { ProductModule } from '@/products/product.module'
import { apiRoutes } from '@/routes/api-route'
import { JwtModule } from '@nestjs/jwt'
import { AuthMiddleware } from '@/middleware/auth.middleware'
import { RolesGuard } from './guards/role.guards'
import { TokenModule } from './token/token.module'
import { getJWTConfig } from './config/jwt.config'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule,
                ProductModule,
                TokenModule,
                RouterModule.register(apiRoutes),
            ],
            inject: [ConfigService],
            useFactory: async () => await getTypeOrmConfig(),
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async () => await getJWTConfig(),
        }),
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*')
    }
    constructor(private dataSource: DataSource) {}
}
