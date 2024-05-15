import { ProductData } from '@/products/product.data'
import { OmitType } from '@nestjs/swagger';

export class CreateProductDto extends OmitType(ProductData, ['id']) {
}
