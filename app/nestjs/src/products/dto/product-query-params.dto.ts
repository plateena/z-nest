import { PageDto } from "@/page.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ProductQueryParamsDto extends PageDto {
    @ApiPropertyOptional({
        description: "Filter by code"
    })
    @IsOptional()
    @IsString()
    readonly 'filter[code]': string

    @ApiPropertyOptional({
        description: "Filter by location",
    })
    @IsOptional()
    @IsString()
    readonly 'filter[location]': string
}
