import * as request from 'supertest'
import { ProductService } from '@/products/product.service'
import { createApp } from '@test/create-app'
import { INestApplication } from '@nestjs/common'
import { TestingModuleBuilder } from '@nestjs/testing'

describe('', () => {
    let app: INestApplication

    beforeAll(async () => {
        app = await createApp()
    })

    it('can post to create product', async () => {
        const createProductDto = {
            code: '1000',
            description: 'Sedan',
            location: 'West Malaysia',
            price: 300.0,
        }

        app = await createApp((b: TestingModuleBuilder) => {
            b.overrideProvider(ProductService).useValue({
                create: () => {
                    return { id: 1, ...createProductDto }
                },
            })
            return b
        })

        const response = await request(app.getHttpServer())
            .post('/api/v1/product')
            .send(createProductDto)

        expect(response.statusCode).toBe(201)

        expect(response.body).toHaveProperty('id')
        expect(response.body.code).toBe(createProductDto.code)
        expect(response.body.description).toBe(createProductDto.description)
        expect(response.body.location).toBe(createProductDto.location)
        expect(response.body.price).toBe(createProductDto.price)
    })

    it('can validate error product data', async () => {
        const createProductDto = {}

        const response = await request(app.getHttpServer())
            .post('/api/v1/product')
            .send(createProductDto)

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toContain('code should not be empty')
        expect(response.body.message).toContain(
            'description should not be empty',
        )
        expect(response.body.message).toContain('location should not be empty')
        expect(response.body.message).toContain('price should not be empty')
        expect(response.body.message).toContain(
            'price must be a number conforming to the specified constraints',
        )
    })

    it('can validate price is number', async () => {
        const createProductDto = {
            code: '1000',
            description: 'Sedan',
            location: 'West Malaysia',
            price: 'add',
        }

        const response = await request(app.getHttpServer())
            .post('/api/v1/product')
            .send(createProductDto)
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toContain(
            'price must be a number conforming to the specified constraints',
        )
    })
})
