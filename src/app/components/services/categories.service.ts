import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Category } from '../models/category.interface';
import { CategoryDTO } from '../interfaces/category-dto.interface';
import { mapCategoryDTOToCategoryModel, mapCategoryModelToCategoryDTO } from '../utils/category.mapper';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _httpClient: HttpClient = inject(HttpClient);
  private API_URL = `${environment.apiUrl}/categories`;

  constructor() {}

  getCategories(): Observable<Category[]> {
    return this._httpClient
      .get<CategoryDTO[]>(`${this.API_URL}`)
      .pipe(
        map((categories: CategoryDTO[]) =>
          categories.map((categoryDto: CategoryDTO) =>
            mapCategoryDTOToCategoryModel(categoryDto)
          )
        )
      );
  }

  createCategory(category: Category): Observable<Category> {
    const categoryDTO: CategoryDTO = mapCategoryModelToCategoryDTO(category);

    return this._httpClient
      .post<CategoryDTO>(`${this.API_URL}`, categoryDTO)
      .pipe(
        map((categoryResponse: CategoryDTO): Category =>
          mapCategoryDTOToCategoryModel(categoryResponse)
        )
      );
  }

  updateCategory(category: Category): Observable<Category> {
    const categoryDTO: CategoryDTO = mapCategoryModelToCategoryDTO(category);

    return this._httpClient
      .put<CategoryDTO>(`${this.API_URL}/${categoryDTO.category_id}`, categoryDTO)
      .pipe(
        map((categoryResponse: CategoryDTO): Category =>
          mapCategoryDTOToCategoryModel(categoryResponse)
        )
      );
  }

  deleteCategory(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.API_URL}/${id}`);
  }
}
