import { HttpStatus, INestApplication } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import * as  request from 'supertest'
import { AppModule } from '@/app.module'

describe('', () => {

    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    afterEach(async () => {
        await app.close()
    })

    it('can post to create product', async () => {
        const createProductDto = {}
        const response = await request(app.getHttpServer())
            .post('/api/v1/product')
            .send(createProductDto)

        expect(response.statusCode).toBe(201)
    })
})
