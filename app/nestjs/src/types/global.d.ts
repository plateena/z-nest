declare global {
    interface IProductData {
        productCode: string
        description: string
        location: string
        price: number
    }
    interface IProductObj extends IProductData {
        id: number
    }

    interface IPaginationQueryParams {
        page?: number
        perPage?: number
    }

    interface IProductQueryParams extends IPaginationQueryParams {
        productCode?: string
        location?: string
    }

    interface IQueryBuilderObj {
        skip?: number
        take?: number
        page?: number
        where?: {
            location?: string
            productCode?: string
        }
    }
}
export {}
