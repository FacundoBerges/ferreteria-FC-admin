import { Category } from '../models/category.interface';
import { CategoryDTO } from '../interfaces/category-dto.interface';

export const mapCategoryModelToCategoryDTO = (categoryModel: Category): CategoryDTO => {
  const dto: CategoryDTO = {
    category_id: categoryModel?.id,
    category_name: categoryModel.name,
    category_image: categoryModel?.imgUrl,
  };

  return dto;
};

export const mapCategoryDTOToCategoryModel = (categoryDTO: CategoryDTO): Category => {
  const model: Category = {
    id: categoryDTO?.category_id,
    name: categoryDTO.category_name,
    imgUrl: categoryDTO?.category_image,
  };

  return model;
};
