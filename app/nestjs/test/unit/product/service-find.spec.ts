import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { DataSource } from 'typeorm'
import { faker } from '@faker-js/faker'
import { ProductService } from '@/products/product.service'
import { ProductFactory } from '@test/factories/product.factory'

describe('Product Service (find)', () => {
    let app: INestApplication
    let connection: DataSource
    let productService: ProductService
    let data: IProductData[] = []

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        productService = app.get<ProductService>(ProductService)
        await app.init()

        connection = moduleFixture.get<DataSource>(DataSource)
    })

    beforeEach(async () => {
        // clear data
        data = []
        data = await ProductFactory(productService, 10, true) || []
    })

    afterEach(async () => {
        await connection.synchronize(true)
    })

    afterAll(async () => {
        await app.close()
    })

    it('can find all data', async () => {
        let rs = await productService.find()

        expect(rs.data).toHaveLength(10)
    })

    it('can set per page data', async () => {
        let rs = await productService.find({ page: 1, perPage: 5 })
        expect(rs.data).toHaveLength(5)
    })

    it('can find by code', async () => {
        let rs = await productService.find({ filter: { code: data[0].code } })

        // need to conver price to string becauuse the result json in string
        let check = convertPriceToString(data[0])

        expect(rs.data).toContainEqual(expect.objectContaining(check))

        //  make sure our result match found result
        expect(rs.data).toHaveLength(
            data.filter((product) => product.code == data[0].code).length,
        )
    })

    it('can find by location', async () => {
        let rs = await productService.find({
            filter: { location: data[0].location },
        })
        // need to conver price to string becauuse the result json in string
        let check = convertPriceToString(data[0])
        expect(rs.data).toContainEqual(expect.objectContaining(check))

        //  make sure our result match found result
        expect(rs.data).toHaveLength(
            data.filter((product) => product.location == data[0].location)
                .length,
        )
    })

    it('can find by both location and code', async () => {
        let rs = await productService.find({
            filter: {
                location: data[0].location,
                code: data[0].code,
            },
        })

        // need to conver price to string becauuse the result json in string
        let check = convertPriceToString(data[0])
        expect(rs.data).toContainEqual(expect.objectContaining(check))

        //  make sure our result match found result
        expect(rs.data).toHaveLength(
            data.filter((product) => {
                return (
                    product.location == data[0].location &&
                    product.code == data[0].code
                )
            }).length,
        )
    })
})

function convertPriceToString(data: IProductData) {
    return { ...data, price: data.price.toFixed(2).toString() }
}
