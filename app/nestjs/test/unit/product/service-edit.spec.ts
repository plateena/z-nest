import { AppModule } from "@/app.module";
import { DataSource } from "typeorm";
import { INestApplication } from "@nestjs/common";
import { ProductFactory } from "@test/factories/product.factory";
import { ProductService } from "@/products/product.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("Product Service (edit)", () => {
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

    afterAll(async () => {
        await connection.synchronize(true)
        await app.close()
    })

    beforeEach(async () => {
        // clear data
        data = []
        data = await ProductFactory(productService, 5, true) || []
    })

    afterEach(async () => {
        await connection.synchronize(true)
    })

    afterAll(async () => {
        await app.close()
    })


    it("can edit the product", async () => {
    });
});
