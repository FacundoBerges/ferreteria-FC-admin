import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';

import { Observable, of } from 'rxjs';

import { AddEditFormComponent } from '../../components/products/add-edit-form/add-edit-form.component';
import { BrandsService } from '../../services/brands.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { DataType, FormType } from '../../types/data-type.type';
import { Product } from '../../models/product.interface';
import { Category } from '../../models/category.interface';
import { Brand } from '../../models/brand.interface';
import { AddNavigationComponent } from '../../components/shared/add-navigation/add-navigation.component';

@Component({
  selector: 'admin-data-page',
  templateUrl: './data-page.component.html',
  styleUrl: './data-page.component.scss',
  standalone: true,
  imports: [AddEditFormComponent, AddNavigationComponent],
})
export class DataPageComponent implements OnInit {
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _brandService: BrandsService = inject(BrandsService);
  private _categoryService: CategoriesService = inject(CategoriesService);
  private _productService: ProductsService = inject(ProductsService);
  private _loading: boolean = true;
  public dataType!: DataType;
  public formType!: FormType;
  public data?: Product | Category | Brand;

  ngOnInit() {
    this.assignDataTypeFromDataObservable(this._activatedRoute.data);
    if (!this.dataType) throw new Error('dataType is required');

    this.setFormTypeBasedOnParams(this._activatedRoute.paramMap);
  }

  private assignDataTypeFromDataObservable(data: Observable<Data>): void {
    data.subscribe((data: Data) => {
      this.dataType = data['dataType'];
    });
  }

  private setFormTypeBasedOnParams(params: Observable<ParamMap>): void {
    params.subscribe((params: ParamMap) => {
      const hasId: boolean = params.has('id');

      if (!hasId) {
        this.formType = 'create';
        this._loading = false;
        return;
      }

      this.formType = 'update';
      this.fetchEntityFromParams(params).subscribe(
        (data: Product | Category | Brand | undefined) => {
          this.data = data;
          this._loading = false;
        }
      );
    });
  }

  private fetchEntityFromParams(
    params: ParamMap
  ): Observable<Product | Category | Brand | undefined> {
    const id: string | null = params.get('id');

    if (!id) return of(undefined);

    switch (this.dataType) {
      case 'product':
        return this._productService.getProductById(id);
      case 'category':
        return this._categoryService.getCategoryById(id);
      case 'brand':
        return this._brandService.getBrandById(id);
      default:
        throw new Error('Invalid dataType');
    }
  }

  public get loading(): boolean {
    return this._loading;
  }

  public onFormSubmit(data: Product | Category | Brand): void {
    switch (this.formType) {
      case 'create':
        this.createEntity(data);
        break;
      case 'update':
        this.updateEntity(data);
        break;
      default:
        throw new Error('Invalid formType');
    }
  }

  private createEntity(data: Product | Category | Brand): void {
    switch (this.dataType) {
      case 'product':
        this._productService.createProduct(data as Product).subscribe();
        break;
      case 'category':
        this._categoryService.createCategory(data as Category).subscribe();
        break;
      case 'brand':
        this._brandService.createBrand(data as Brand).subscribe();
        break;
      default:
        throw new Error('Invalid dataType');
    }
  }

  private updateEntity(data: Product | Category | Brand): void {
    switch (this.dataType) {
      case 'product':
        this._productService.updateProduct(data as Product).subscribe();
        break;
      case 'category':
        this._categoryService.updateCategory(data as Category).subscribe();
        break;
      case 'brand':
        this._brandService.updateBrand(data as Brand).subscribe();
        break;
      default:
        throw new Error('Invalid dataType');
    }
  }
}
