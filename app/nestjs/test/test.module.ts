import { AuthMiddleware } from '@/middleware/auth.middleware'
import { Controller, Get, MiddlewareConsumer, Module, NestModule, Req, RequestMethod, } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { Request } from 'express'

@Controller('test')
export class TestController {
    @Get()
    test(@Req() req: Request) {
        return req.user || {}
    }
}

@Module({
    imports: [JwtModule.register({ secret: 'test_secret_key' })],
    controllers: [TestController],
})
export class TestModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
