import * as request from 'supertest'
import { ProductService } from '@/products/product.service'
import { createApp } from '@test/create-app'
import { INestApplication } from '@nestjs/common'
import { spyOnRoleGuard } from '@test/utils/spy.role'
import { Product } from '@/products/product.entity'
import { ProductFactory } from '@test/factories/product.factory'
import { TestingModuleBuilder } from '@nestjs/testing'

jest.mock('@/products/product.service')

describe('Product Delete Endpoint', () => {
    let app: INestApplication
    let data: Product[]

    beforeAll(async () => {
        // app = await createApp()

        spyOnRoleGuard('admin')
    })

    it('should delete a product successfully', async () => {
        app = await createApp((builder: TestingModuleBuilder) => {
            builder.overrideProvider(ProductService).useValue({
                deleteProduct: async () => {},
            })

            return builder
        })

        const response = await request(app.getHttpServer()).delete(
            '/api/v1/product/1',
        )
        expect(response.statusCode).toBe(200)
    })
})
