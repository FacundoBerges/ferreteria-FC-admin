import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { ProductDTO } from '../interfaces/product-dto.interface';
import { Product, ProductTable } from '../models/product.interface';
import { mapProductDTOToProductModel, mapProductModelToProductDTO, mapProductDTOToProductTable } from '../utils/product.mapper';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _API_URL = `${environment.apiUrl}/products`;

  constructor() {}

  public getProducts(): Observable<ProductTable[]> {
    return this._httpClient
      .get<ProductDTO[]>(`${this._API_URL}`)
      .pipe(
        map((products: ProductDTO[]): ProductTable[] =>
          products.map(
            (product: ProductDTO): ProductTable =>
              mapProductDTOToProductTable(product)
          )
        )
      );
  }

  public getProductById(id: string): Observable<Product> {
    return this._httpClient
      .get<ProductDTO>(`${this._API_URL}/${id}`)
      .pipe(
        map(
          (product: ProductDTO): Product => mapProductDTOToProductModel(product)
        )
      );
  }

  public createProduct(product: Product): Observable<Product> {
    const productDTO = mapProductModelToProductDTO(product);

    return this._httpClient
      .post<ProductDTO>(`${this._API_URL}`, productDTO)
      .pipe(
        map(
          (productResponse: ProductDTO): Product =>
            mapProductDTOToProductModel(productResponse)
        )
      );
  }

  public updateProduct(product: Product): Observable<Product> {
    const productDTO = mapProductModelToProductDTO(product);

    return this._httpClient
      .put<ProductDTO>(`${this._API_URL}/${productDTO.product_id}`, productDTO)
      .pipe(
        map(
          (productResponse: ProductDTO): Product => mapProductDTOToProductModel(productResponse)
        )
      );
  }

  public deleteProduct(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this._API_URL}/${id}`);
  }
}
