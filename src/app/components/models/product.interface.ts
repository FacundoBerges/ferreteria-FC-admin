import { Brand } from './brand.interface';
import { Category } from './category.interface';

export interface Product {
  id: number;
  code: string;
  description: string;
  price?: number;
  imgUrl?: string;
  brand: Brand;
  category: Category;
}

export const productKeys: string[] = [
  'id',
  'code',
  'description',
  'price',
  'imgUrl',
  'brand',
  'category',
];
