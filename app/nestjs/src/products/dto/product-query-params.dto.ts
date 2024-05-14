import { PageDto } from "@/page.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ProductQueryParamsDto extends PageDto {
    @ApiPropertyOptional({
        description: "Filter by product code"
    })
    @IsOptional()
    @IsString()
    readonly productCode?: string;

    @ApiPropertyOptional({
        description: "Filter by location",
    })
    @IsOptional()
    @IsString()
    readonly location?: string;
}
