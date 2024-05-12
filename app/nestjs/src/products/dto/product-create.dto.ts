import { IsNotEmpty, IsNumberString, IsNumber } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    location: string

    @IsNotEmpty()
    @IsNumber()
    price: string
}
