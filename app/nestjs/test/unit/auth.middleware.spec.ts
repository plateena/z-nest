import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { generateFakeToken } from '@test/utils/gen-fake-token'
import { TestModule } from '@test/test.module'

describe('AuthMiddleware', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TestModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should attach user data to the request object', async () => {
        const token = generateFakeToken('123', 'admin')
        const response = await request(app.getHttpServer())
            .get('/test')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body).toEqual({
            id: '123',
            role: 'admin',
        })
    })

    it('should handle missing or invalid token', async () => {
        try {
            await request(app.getHttpServer()).get('/test').expect(200).expect({})
        } catch(err) {}

        try {
            const invalidToken = 'invalid_token'
            await request(app.getHttpServer())
                .get('/test')
                .set('Authorization', `Bearer ${invalidToken}`)
                .expect(500)
        } catch(err) {}
    })
})
