import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { ProductDTO } from '../interfaces/product-dto.interface';
import { Product } from '../models/product.interface';
import {
  mapProductDTOToProductModel,
  mapProductModelToProductDTO,
} from '../utils/product.mapper';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _httpClient: HttpClient = inject(HttpClient);
  private API_URL = `${environment.apiUrl}/products`;

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this._httpClient
      .get<ProductDTO[]>(`${this.API_URL}`)
      .pipe(
        map((products: ProductDTO[]) =>
          products.map(
            (product: ProductDTO): Product =>
              mapProductDTOToProductModel(product)
          )
        )
      );
  }

  createProduct(product: Product): Observable<Product> {
    const productDTO = mapProductModelToProductDTO(product);

    return this._httpClient
      .post<ProductDTO>(`${this.API_URL}`, productDTO)
      .pipe(
        map(
          (productResponse: ProductDTO): Product =>
            mapProductDTOToProductModel(productResponse)
        )
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const productDTO = mapProductModelToProductDTO(product);

    return this._httpClient
      .put<ProductDTO>(`${this.API_URL}/${productDTO.product_id}`, productDTO)
      .pipe(
        map(
          (productResponse: ProductDTO): Product =>
            mapProductDTOToProductModel(productResponse)
        )
      );
  }

  deleteProduct(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.API_URL}/${id}`);
  }
}
