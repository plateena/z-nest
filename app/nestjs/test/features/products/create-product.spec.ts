import * as request from 'supertest'
import { ProductService } from '@/products/product.service'
import { createApp } from '@test/create-app'
import { INestApplication } from '@nestjs/common'
import { spyOnRoleGuard } from '@test/utils/spy.role'

jest.mock('@/products/product.service')

describe('Product Creation Endpoint', () => {
    let app: INestApplication

    beforeAll(async () => {
        app = await createApp()

        spyOnRoleGuard('admin')
    })

    it('should create a product successfully', async () => {
        // Arrange
        const createProductDto = {
            productCode: '1000',
            description: 'Sedan',
            location: 'West Malaysia',
            price: 300.0,
        }

        const productServiceMock = ProductService as jest.MockedClass<
            typeof ProductService
        >
        productServiceMock.prototype.create.mockResolvedValueOnce({
            id: 1,
            ...createProductDto,
        })

        // Act
        const response = await request(app.getHttpServer())
            .post('/api/v1/product')
            .send(createProductDto)

        // Assert
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual(expect.objectContaining(createProductDto))
    })

    it('should return validation errors for incomplete product data', async () => {
        // Arrange
        const createProductDto = {}

        // Act
        const response = await request(app.getHttpServer())
            .post('/api/v1/product')
            .send(createProductDto)

        // Assert
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toContain(
            'productCode should not be empty',
        )
        expect(response.body.message).toContain(
            'description should not be empty',
        )
        expect(response.body.message).toContain('location should not be empty')
        expect(response.body.message).toContain('price should not be empty')
    })

    it('should return validation error for non-numeric price', async () => {
        // Arrange
        const createProductDto = {
            productCode: '1000',
            description: 'Sedan',
            location: 'West Malaysia',
            price: 'add',
        }

        // Act
        const response = await request(app.getHttpServer())
            .post('/api/v1/product')
            .send(createProductDto)

        // Assert
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toContain(
            'price must be a number conforming to the specified constraints',
        )
    })
})
