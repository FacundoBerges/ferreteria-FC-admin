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

export interface ProductTable {
  id: number;
  code: string;
  description: string;
  price?: number;
  imgUrl: string;
  brand: string;
  category: string;
}

export interface ProductForm {
  code: string;
  description: string;
  price?: number;
  imgUrl?: string;
  brand_id: number;
  category_id: number;
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
