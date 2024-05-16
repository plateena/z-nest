import { AppModule } from '@/app.module'
import { DataSource } from 'typeorm'
import { INestApplication, NotFoundException } from '@nestjs/common'
import { ProductFactory } from '@test/factories/product.factory'
import { ProductService } from '@/products/product.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('ProductService - Delete Product', () => {
    let app: INestApplication
    let connection: DataSource
    let productService: ProductService
    let data: any[] = []

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
        await connection.synchronize(true)
        await app.close()
    })

    beforeEach(async () => {
        // Clear data
        data = []
        data = (await ProductFactory(productService, 5, true)) || []
    })

    afterEach(async () => {
        await connection.synchronize(true)
    })

    it('should successfully delete an existing product', async () => {
        expect((await productService.find()).data.length).toBe(5)
        await expect(
            productService.deleteProduct(data[0].id),
        ).resolves.not.toThrow()
        expect((await productService.find()).data.length).toBe(4)
    })

    it('should throw NotFoundException when trying to delete a non-existent product', async () => {
        try {
            await productService.deleteProduct(100000000)
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException)
            expect(error.message).toBe('Product not exists!')
        }
    })
})
