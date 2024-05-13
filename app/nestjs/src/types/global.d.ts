declare global {
    interface IProductData {
        code: string
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
        filter?: {
            code?: string
            location?: string
        }
        'filter[code]'?: string
        'filter[location]'?: string
    }

    interface IQueryBuilderObj {
        skip?: number
        take?: number
        page?: number
        where?: {
            location?: string
            code?: string
        }
    }
}
export {}
