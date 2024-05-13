import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber } from 'class-validator'
import { IQueryBuilderObj } from './products/product.service'

export class PageDto<T> {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: T[]

    @IsArray()
    readonly total: number

    @IsNumber()
    readonly page: number

    @IsNumber()
    readonly perPage: number

    @IsNumber()
    readonly totalPage: number

    constructor(data: T[], total: number, query: IQueryBuilderObj) {
        this.total = total
        this.page = query.skip + 1 || 1
        this.perPage = query.take || 5
        this.totalPage = Math.ceil(total / this.perPage)
        this.data = data
    }
}
