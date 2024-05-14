import { ProductService } from '@/products/product.service'
import { faker } from '@faker-js/faker'

export const ProductFactory = async (
    services: ProductService,
    dataCount = 1,
    toBeStore = false,
): Promise<IProductObj[] | IProductData[]> => {
    let data: IProductData[] = []
    // clear data
    data = []
    enum ELocation {
        a = 'West Malaysia',
        b = 'East Malaysia',
    }
    for (let i = 0; i < dataCount; i++) {
        data.push({
            productCode: faker.number.int({ min: 1000, max: 9999 }).toString(),
            description: faker.word.noun({ length: { min: 5, max: 20 } }),
            location: faker.helpers.enumValue(ELocation),
            price: parseFloat(faker.finance.amount()),
        })
    }

    if (toBeStore) {
        await services.productRepository.insert(data)
    }

    return data
}
