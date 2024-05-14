import { AppModule } from '@/app.module'
import { DataSource } from 'typeorm'
import { INestApplication, NotFoundException } from '@nestjs/common'
import { ProductFactory } from '@test/factories/product.factory'
import { ProductService } from '@/products/product.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('Product Service (edit)', () => {
    let app: INestApplication
    let connection: DataSource
    let productService: ProductService
    let data: IProductData[] | IProductObj = []

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
        // clear data
        data = []
        data = (await ProductFactory(productService, 5, true)) || []
    })

    afterEach(async () => {
        await connection.synchronize(true)
    })

    afterAll(async () => {
        await app.close()
    })

    it('can edit the product', async () => {
        // to make sure others data are not udpated
        data[1] = await productService.updateProduct(data[1].id, {
            price: 9000,
        })
        const editPrice = 3000
        const result = await productService.updateProduct(data[0].id, {
            price: editPrice,
        })
        let expectedResult = { ...data[0], price: editPrice }
        expect(result).toMatchObject(expectedResult)

        // make sure the data not change
        expect(data[1].price).not.toEqual(expectedResult.price)
    })

    it("can't react to product not found", async () => {
        await expect(productService.updateProduct(10000, {})).rejects.toThrow(
            NotFoundException,
        )
    })
})
