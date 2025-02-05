import { BrandDTO } from './brand-dto.interface';
import { CategoryDTO } from './category-dto.interface';

export interface ProductDTO {
  product_id?: number;
  product_description: string;
  product_code: string;
  product_price?: number;
  product_image_url: string;
  product_brand: BrandDTO;
  product_category: CategoryDTO;
}
