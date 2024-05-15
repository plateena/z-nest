import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from '@/token/token.service'
import { TokenController } from '@/token/token.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from '@/config/jwt.config'

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async () => await getJWTConfig()
        }),
    ],
    controllers: [TokenController],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
