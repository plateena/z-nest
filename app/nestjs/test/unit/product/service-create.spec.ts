import { AppModule } from '@/app.module'
import { DataSource } from 'typeorm'
import { INestApplication } from '@nestjs/common'
import { ProductService } from '@/products/product.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('ProductService - Create Product', () => {
    let app: INestApplication
    let connection: DataSource
    let productService: ProductService

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()

        connection = moduleFixture.get<DataSource>(DataSource)
        productService = app.get<ProductService>(ProductService)
    })

    afterAll(async () => {
        await connection.synchronize(true)
        await app.close()
    })

    beforeEach(async () => {
        // Clear data before each test
        await connection.synchronize(true)
    })

    it('should create a new product with valid data', async () => {
        // Test data
        const productData = {
            productCode: '1000',
            description: 'Test Product',
            location: 'Test Location',
            price: 100.0,
        }

        // Call the create method of the ProductService
        const createdProduct = await productService.create(productData)

        // Assert that the product was created correctly
        expect(createdProduct).toBeDefined()
        expect(createdProduct.productCode).toEqual(productData.productCode)
        expect(createdProduct.description).toEqual(productData.description)
        expect(createdProduct.location).toEqual(productData.location)
        expect(createdProduct.price).toEqual(productData.price)

        // Additional assertions to verify the product is saved in the database
        const foundProduct = await productService.findOne(createdProduct.id)
        expect(foundProduct).toBeDefined()
        expect(foundProduct.productCode).toEqual(productData.productCode)
        expect(foundProduct.description).toEqual(productData.description)
        expect(foundProduct.location).toEqual(productData.location)
        expect(foundProduct.price).toEqual(
            productData.price.toFixed(2).toString(),
        )
    })
})
