import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { ProductService } from '@/products/product.service'

describe('ProductService (Integration)', () => {
    let app: INestApplication
    let connection: DataSource

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()

        connection = moduleFixture.get<DataSource>(DataSource)
    })

    afterAll(async () => {
        await connection.synchronize(true)
        await app.close()
    })

    it('should create a new product', async () => {
        const productService = app.get<ProductService>(ProductService)

        // Test data
        const productData = {
            code: '1000',
            description: 'Test Product',
            location: 'Test Location',
            price: 100.0,
        }

        // Call the create method of the ProductService
        const createdProduct = await productService.create(productData)

        // Assert that the product was created correctly
        expect(createdProduct).toBeDefined()
        expect(createdProduct.code).toEqual(productData.code)
        expect(createdProduct.description).toEqual(productData.description)
        expect(createdProduct.location).toEqual(productData.location)
        expect(createdProduct.price).toEqual(productData.price)
    })
})
