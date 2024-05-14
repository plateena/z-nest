import { AppModule } from '@/app.module'
import { ProductService } from '@/products/product.service'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ProductFactory } from '@test/factories/product.factory'
import { DataSource } from 'typeorm'

describe('Product Service (Find One)', () => {
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

    it('can find one product by id', async () => {
        let result = await productService.findOne(data[0].id)
        let expectedResult = {
            ...data[0],
            price: data[0].price.toFixed(2).toString(),
        }
        expect(result).toEqual(expectedResult)
    })

    it('can\'t find one product by id', async () => {
        let result = await productService.findOne(100)
        expect(result).toEqual(null)
    })
})
