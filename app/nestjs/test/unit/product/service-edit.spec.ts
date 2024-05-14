import { AppModule } from '@/app.module'
import { DataSource } from 'typeorm'
import { INestApplication, NotFoundException } from '@nestjs/common'
import { ProductFactory } from '@test/factories/product.factory'
import { ProductService } from '@/products/product.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('Product Service - Edit Product', () => {
    let app: INestApplication
    let connection: DataSource
    let productService: ProductService
    let initialProducts: any[]

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        productService = moduleFixture.get<ProductService>(ProductService)
        await app.init()

        connection = moduleFixture.get<DataSource>(DataSource)
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(async () => {
        await connection.synchronize(true)
        initialProducts = (await ProductFactory(productService, 5, true)) || []
    })

    afterEach(async () => {
        await connection.synchronize(true)
    })

    it('should update an existing product successfully', async () => {
        // Arrange
        const productToUpdate = initialProducts[0]
        const newPrice = 3000

        // Act
        const updatedProduct = await productService.updateProduct(
            productToUpdate.id,
            { price: newPrice },
        )

        // Assert
        expect(updatedProduct).toBeDefined()
        expect(updatedProduct.price).toEqual(newPrice)

        // Verify other properties remain unchanged
        const updatedProductInDb = await productService.findOne(
            productToUpdate.id,
        )
        expect(updatedProductInDb.productCode).toEqual(
            productToUpdate.productCode,
        )
        expect(updatedProductInDb.description).toEqual(
            productToUpdate.description,
        )
        expect(updatedProductInDb.location).toEqual(productToUpdate.location)
    })

    it('should throw NotFoundException when updating a non-existing product', async () => {
        // Act and Assert
        await expect(
            productService.updateProduct(10000, { price: 100 }),
        ).rejects.toThrow(NotFoundException)
    })
})
