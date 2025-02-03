import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Brand } from '../models/brand.interface';
import { BrandDTO } from '../interfaces/brand-dto.interface';
import {
  mapBrandDTOToBrandModel,
  mapBrandModelToBrandDTO,
} from '../utils/brand.mapper';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private _httpClient: HttpClient = inject(HttpClient);
  private API_URL = `${environment.apiUrl}/brands`;

  constructor() {}

  getBrands(): Observable<Brand[]> {
    return this._httpClient
      .get<BrandDTO[]>(this.API_URL)
      .pipe(
        map((brands: BrandDTO[]): Brand[] =>
          brands.map(
            (brandDto: BrandDTO): Brand => mapBrandDTOToBrandModel(brandDto)
          )
        )
      );
  }

  createBrand(brand: Brand): Observable<Brand> {
    const brandDto: BrandDTO = mapBrandModelToBrandDTO(brand);

    return this._httpClient
      .post<BrandDTO>(this.API_URL, brandDto)
      .pipe(
        map(
          (brandDtoResponse: BrandDTO): Brand =>
            mapBrandDTOToBrandModel(brandDtoResponse)
        )
      );
  }

  updateBrand(brand: Brand): Observable<Brand> {
    const brandDto: BrandDTO = mapBrandModelToBrandDTO(brand);

    return this._httpClient
      .put<BrandDTO>(`${this.API_URL}/${brand.id}`, brandDto)
      .pipe(
        map(
          (brandDtoResponse: BrandDTO): Brand =>
            mapBrandDTOToBrandModel(brandDtoResponse)
        )
      );
  }

  deleteBrand(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.API_URL}/${id}`);
  }
}
