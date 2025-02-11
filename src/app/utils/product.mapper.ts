import { Product, ProductTable } from '../models/product.interface';
import { ProductDTO } from '../interfaces/product-dto.interface';
import { mapBrandDTOToBrandModel, mapBrandModelToBrandDTO } from './brand.mapper';
import { mapCategoryDTOToCategoryModel, mapCategoryModelToCategoryDTO } from './category.mapper';

export const mapProductModelToProductDTO = (productModel: Product): ProductDTO => {
  const dto: ProductDTO = {
    product_id: productModel.id,
    product_description: productModel.description,
    product_code: productModel.code,
    product_image_url: productModel.imgUrl,
    product_brand: mapBrandModelToBrandDTO(productModel.brand),
    product_category: mapCategoryModelToCategoryDTO(productModel.category),
  };

  return dto;
};

export const mapProductDTOToProductModel = (productDTO: ProductDTO): Product => {
  const model: Product = {
    id: productDTO.product_id,
    description: productDTO.product_description,
    code: productDTO.product_code,
    imgUrl: productDTO.product_image_url,
    brand: mapBrandDTOToBrandModel(productDTO.product_brand),
    category: mapCategoryDTOToCategoryModel(productDTO.product_category),
  };

  return model;
};

export const mapProductDTOToProductTable = (productDTO: ProductDTO): ProductTable => {
  const brandName = productDTO.product_brand?.brand_name || '--';
  const categoryName = productDTO.product_category.category_name;

  const tableModel: ProductTable = {
    id: productDTO.product_id,
    description: productDTO.product_description,
    code: productDTO.product_code,
    imgUrl: productDTO.product_image_url,
    brand: brandName,
    category: categoryName,
  };

  return tableModel;
};

