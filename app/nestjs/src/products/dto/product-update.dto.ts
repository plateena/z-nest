import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./product-create.dto";

/**
 * DTO for updating product details.
 * Extends `PartialType` to make all fields optional,
 * and `OmitType` to exclude `productCode` from the update.
 */
export class UpdateProductDto extends PartialType(OmitType(CreateProductDto, ['productCode'])) {}
