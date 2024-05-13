import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
    IsArray,
    IsNumber,
    IsNumberString,
    IsOptional,
} from 'class-validator'

export class PageDto {
    @IsNumber() @IsOptional()
    readonly total: number

    @ApiPropertyOptional({
        minimum: 1,
        required: false,
        type: 'number',
        description: "Go to page"
    })
    @IsNumberString()
    @IsOptional()
    readonly page?: number

    @ApiPropertyOptional({
        minimum: 1,
        required: false,
        type: 'number',
        description: "Set how many data in one page"
    })
    @IsNumberString()
    @IsOptional()
    readonly perPage?: number

    @IsNumber()
    @IsOptional()
    readonly totalPage?: number

    constructor(total: number, query: IQueryBuilderObj) {
        this.total = total
        if (query?.page) {
            this.page = query.skip + 1 || 1
            this.perPage = parseInt(query.take.toString()) || 5
            this.totalPage = Math.ceil(total / this.perPage)
        }
    }
}

export class PageDataDto<T> extends PageDto {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: T[]

    constructor(data: T[], total: number, query: IQueryBuilderObj) {
        super(total, query)
        this.data = data
    }
}
