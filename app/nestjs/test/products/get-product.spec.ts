import { ProductService } from '@/products/product.service'
import { INestApplication } from '@nestjs/common'
import { TestingModuleBuilder } from '@nestjs/testing'
import { createApp } from '@test/create-app'
import * as request from 'supertest'

describe('Get /product', () => {
    let app: INestApplication
    it('can get products', async () => {
        app = await createApp((builder: TestingModuleBuilder) => {
            builder.overrideProvider(ProductService)
            .useValue({
                find: async () => {
                    return {
                        data: []
                    }
                }
            })

            return builder
        })

        const response = await request(app.getHttpServer()).get(
            '/api/v1/product',
        )

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})
