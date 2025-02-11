import { Brand } from '../models/brand.interface';
import { BrandDTO } from '../interfaces/brand-dto.interface';

export const mapBrandModelToBrandDTO = (brandModel: Brand): BrandDTO => {
  if (!brandModel) return brandModel;

  const dto: BrandDTO = {
    brand_id: brandModel.id,
    brand_name: brandModel.name,
  };

  return dto;
};

export const mapBrandDTOToBrandModel = (brandDTO: BrandDTO): Brand => {
  if (!brandDTO) return brandDTO;

  const model: Brand = {
    id: brandDTO.brand_id,
    name: brandDTO.brand_name,
  };

  return model;
};
