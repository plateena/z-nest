import { AppModule } from '@/app.module'
import { ProductService } from '@/products/product.service'
import { INestApplication, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ProductFactory } from '@test/factories/product.factory'
import { DataSource } from 'typeorm'

describe('Product Service - Find One', () => {
    let app: INestApplication
    let connection: DataSource
    let productService: ProductService
    let testData: any[]

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        productService = app.get<ProductService>(ProductService)
        await app.init()

        connection = moduleFixture.get<DataSource>(DataSource)
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(async () => {
        await connection.synchronize(true)
        testData = (await ProductFactory(productService, 5, true)) || []
    })

    afterEach(async () => {
        await connection.synchronize(true)
    })

    it('should find a product by id', async () => {
        // Arrange
        const expectedProduct = testData[0]
        const expectedPriceString = expectedProduct.price.toFixed(2).toString()

        // Act
        const result = await productService.findOne(expectedProduct.id)

        // Assert
        expect(result).toBeDefined()
        expect(result.id).toEqual(expectedProduct.id)
        expect(result.productCode).toEqual(expectedProduct.productCode)
        expect(result.description).toEqual(expectedProduct.description)
        expect(result.location).toEqual(expectedProduct.location)
        expect(result.price).toEqual(expectedPriceString)
    })

    it("should throw NotFoundException when product with specified ID doesn't exist", async () => {
        // Act & Assert
        await expect(productService.findOne(1000)).rejects.toThrowError(NotFoundException)
    })
})
