import { RoleMiddleware } from '@/middleware/role-middleware'
import { INestApplication, NestMiddleware, Next } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('OriginChecker Middleware:', () => {
    let app: INestApplication
    let roleMiddleware: NestMiddleware

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
        })
            .compile()
        app = moduleRef.createNestApplication()
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    it('test', async () => {
    })
})
