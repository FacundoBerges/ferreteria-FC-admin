import { Brand } from './brand.interface';
import { Category } from './category.interface';

export interface Product {
  id?: number;
  code: string;
  description: string;
  imgUrl?: string;
  brand: Brand;
  category: Category;
}

export interface ProductTable {
  id?: number;
  code: string;
  description: string;
  imgUrl?: string;
  brand: string;
  category: string;
}

export const productKeys: string[] = [
  'id',
  'code',
  'description',
  'imgUrl',
  'brand',
  'category',
  'actions',
];
