import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { DataSource } from 'typeorm'
import { ProductService } from '@/products/product.service'
import { ProductFactory } from '@test/factories/product.factory'

describe('Product Service - Find Product', () => {
    let app: INestApplication
    let connection: DataSource
    let productService: ProductService
    let testData: any[]

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        productService = moduleFixture.get<ProductService>(ProductService)
        await app.init()

        connection = moduleFixture.get<DataSource>(DataSource)
    })

    beforeEach(async () => {
        await connection.synchronize(true)
        testData = (await ProductFactory(productService, 10, true)) || []
    })

    afterEach(async () => {
        await connection.synchronize(true)
    })

    afterAll(async () => {
        await app.close()
    })

    it('should find all products', async () => {
        const result = await productService.find()
        expect(result.data).toHaveLength(10)
    })

    it('should limit results per page', async () => {
        const result = await productService.find({ page: 1, perPage: 5 })
        expect(result.data).toHaveLength(5)
    })

    it('should find products by product code', async () => {
        const product = testData[0]
        const result = await productService.find({
            productCode: product.productCode,
        })
        expect(result.data).toContainEqual(
            expect.objectContaining(convertPriceToString(product)),
        )
        expect(result.data).toHaveLength(
            testData.filter((p) => p.productCode === product.productCode)
                .length,
        )
    })

    it('should find products by location', async () => {
        const product = testData[0]
        const result = await productService.find({ location: product.location })
        expect(result.data).toContainEqual(
            expect.objectContaining(convertPriceToString(product)),
        )
        expect(result.data).toHaveLength(
            testData.filter((p) => p.location === product.location).length,
        )
    })

    it('should find products by both location and product code', async () => {
        const product = testData[0]
        const result = await productService.find({
            productCode: product.productCode,
            location: product.location,
        })
        expect(result.data).toContainEqual(
            expect.objectContaining(convertPriceToString(product)),
        )
        expect(result.data).toHaveLength(
            testData.filter(
                (p) =>
                    p.productCode === product.productCode &&
                    p.location === product.location,
            ).length,
        )
    })
})

function convertPriceToString(data: any) {
    return { ...data, price: data.price.toFixed(2).toString() }
}
