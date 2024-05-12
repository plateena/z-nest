import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { getRepository } from 'typeorm'
import { Product } from '@/products/product.entity'

describe('', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        app.useGlobalPipes(new ValidationPipe())
        await app.init()
    })

    afterEach(async () => {
        if (app) {
            // await app.close()
        }
    })

    it('can post to create product', async () => {
        const createProductDto = {
            code: '1000',
            description: 'Sedan',
            location: 'West Malaysia',
            price: 300.0,
        }
        const response = await request(app.getHttpServer())
            .post('/api/v1/product')
            .send(createProductDto)

        expect(response.statusCode).toBe(201)
         const productRepository = getRepository(Product)
        const createdProduct = await productRepository.findOne({ where: { code: createProductDto.code } });
        expect(createdProduct).toBeDefined();

        // expect(response.body).toHaveProperty('id')
        // expect(response.body.code).toBe(createProductDto.code)
        // expect(response.body.description).toBe(createProductDto.description)
        // expect(response.body.location).toBe(createProductDto.location)
        // expect(response.body.price).toBe(createProductDto.price)
    })

    it('can validate error product data', async () => {
        const createProductDto = {}

        const response = await request(app.getHttpServer())
            .post('/api/v1/product')
            .send(createProductDto)

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toContain('code should not be empty')
        expect(response.body.message).toContain(
            'description should not be empty',
        )
        expect(response.body.message).toContain('location should not be empty')
        expect(response.body.message).toContain('price should not be empty')
    })

    it('can validate price is number', async () => {
        const createProductDto = {
            code: '1000',
            description: 'Sedan',
            location: 'West Malaysia',
            price: 'add',
        }

        const response = await request(app.getHttpServer())
            .post('/api/v1/product')
            .send(createProductDto)
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toContain(
            'price must be a number conforming to the specified constraints',
        )
    })
})
