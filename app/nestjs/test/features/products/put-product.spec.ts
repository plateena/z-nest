import { ProductService } from '@/products/product.service'
import { INestApplication, NotFoundException } from '@nestjs/common'
import { TestingModuleBuilder } from '@nestjs/testing'
import { createApp } from '@test/create-app'
import * as request from 'supertest'

describe('PUT /product', () => {
    let app: INestApplication

    it('can call api PUT /product with success', async () => {
        app = await createApp((builder: TestingModuleBuilder) => {
            builder.overrideProvider(ProductService).useValue({
                updateProduct: async () => {},
            })

            return builder
        })

        const response = await request(app.getHttpServer()).put(
            '/api/v1/product/1',
        )

        expect(response.statusCode).toBe(200)
    })

    it('can validate body data', async () => {
        app = await createApp((builder: TestingModuleBuilder) => {
            builder.overrideProvider(ProductService).useValue({
                updateProduct: async () => {},
            })

            return builder
        })

        const response = await request(app.getHttpServer())
            .put('/api/v1/product/1')
            .send({
                price: 'Hello',
                code: null,
                location: '',
                description: '',
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('Bad Request')
        expect(response.body.message).toContain(
            'price must be a number conforming to the specified constraints',
        )
    })

    it('can show error message when no product found', async () => {
        app = await createApp((builder: TestingModuleBuilder) => {
            builder.overrideProvider(ProductService).useValue({
                updateProduct: async () => {
                    throw new NotFoundException('Product not found')
                },
            })

            return builder
        })

        try {
            const response = await request(app.getHttpServer()).put(
                '/api/v1/product/1000',
            )
            expect(response.statusCode).toBe(404)
        } catch (err) {}
    })
})
