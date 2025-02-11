import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';

import { lastValueFrom, Observable, of } from 'rxjs';

import { AddEditFormComponent } from '../../components/products/add-edit-form/add-edit-form.component';
import { AddNavigationComponent } from '../../components/shared/add-navigation/add-navigation.component';
import { DisplayImageComponent } from '../../components/shared/display-image/display-image.component';
import { BrandsService } from '../../services/brands.service';
import { CategoriesService } from '../../services/categories.service';
import { ImagesService } from '../../services/images.service';
import { ProductsService } from '../../services/products.service';
import { SnackbarService } from '../../components/shared/snackbar.service';
import { DataType, FormType } from '../../types/data-type.type';
import { Brand } from '../../models/brand.interface';
import { Category } from '../../models/category.interface';
import { Product } from '../../models/product.interface';
import { ImageDTO } from '../../interfaces/image-dto.interface';

@Component({
  selector: 'admin-data-page',
  templateUrl: './data-page.component.html',
  styleUrl: './data-page.component.scss',
  standalone: true,
  imports: [
    AddEditFormComponent,
    AddNavigationComponent,
    DisplayImageComponent,
    NgClass,
  ],
})
export class DataPageComponent implements OnInit {
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _brandService: BrandsService = inject(BrandsService);
  private _categoryService: CategoriesService = inject(CategoriesService);
  private _imageService: ImagesService = inject(ImagesService);
  private _productService: ProductsService = inject(ProductsService);
  private _snackbarService: SnackbarService = inject(SnackbarService);
  private _loading: boolean = true;
  public dataType!: DataType;
  public formType!: FormType;
  public imageBlob?: Blob;
  public imageFile?: File;
  public brands$?: Observable<Brand[]>;
  public categories$?: Observable<Category[]>;
  public data?: Product | Category | Brand;

  ngOnInit() {
    this._assignDataTypeFromDataObservable(this._activatedRoute.data);
    if (!this.dataType) throw new Error('dataType is required');

    if (this.dataType === 'product') {
      this._loadBrandsFromService();
      this._loadCategoriesFromService();
    }

    this._setFormTypeBasedOnParams(this._activatedRoute.paramMap);
  }

  get brandDataType(): boolean {
    return this.dataType === 'brand';
  }

  private _assignDataTypeFromDataObservable(data: Observable<Data>): void {
    data.subscribe((data: Data) => {
      this.dataType = data['dataType'];
    });
  }

  private _setFormTypeBasedOnParams(params: Observable<ParamMap>): void {
    params.subscribe((params: ParamMap) => {
      const hasId: boolean = params.has('id');

      if (!hasId) {
        this.formType = 'create';
        this._loading = false;
        return;
      }

      this.formType = 'update';
      this._fetchEntityFromParams(params).subscribe(
        (data: Product | Category | Brand | undefined) => {
          this.data = data;
          if (this.dataType === 'product' || this.dataType === 'category')
            this._fetchImage((data as Product)?.imgUrl || '');

          this._loading = false;
        }
      );
    });
  }

  private _fetchEntityFromParams(
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

  private _fetchImage(img: string): void {
    this._imageService.getImageByName(img).subscribe((blob: Blob) => {
      this.imageBlob = blob;
    });
  }

  private _loadBrandsFromService(): void {
    this.brands$ = this._brandService.getBrands();
  }

  private _loadCategoriesFromService(): void {
    this.categories$ = this._categoryService.getCategories();
  }

  public get loading(): boolean {
    return this._loading;
  }

  public async onFormSubmit(data: Product | Category | Brand): Promise<void> {
    if (this.imageBlob && this.imageFile && (this.dataType === 'product' || this.dataType === 'category')) {
      const imageDTO: ImageDTO | undefined = await lastValueFrom(this._imageService.uploadImage(this.imageFile));
      
      if (imageDTO) (data as Product | Category).imgUrl = imageDTO.file_name;
    }

    switch (this.formType) {
      case 'create':
        this._createEntity(data);
        break;
      case 'update':
        this._updateEntity(data);
        break;
      default:
        throw new Error('Invalid formType');
    }
  }

  public onImageFileSelect(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent) => {
      const eventTarget = e.target as FileReader;
      const blob: Blob = new Blob([eventTarget?.result!], { type: file.type });
      this.imageBlob = blob;
      this.imageFile = file;
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    } else {
      this.imageBlob = undefined;
      this.imageFile = undefined;
    }
  }

  private _createEntity(data: Product | Category | Brand): void {
    switch (this.dataType) {
      case 'product':
        this._productService.createProduct(data as Product).subscribe(
          {
            next: () => this._snackbarService.showSnackbar('Producto guardado correctamente!'), 
            error: (err) => {
              this._snackbarService.showSnackbar('Error al guardar producto...');
              console.error(err);
            }
          }
        );
        break;
      case 'category':
        this._categoryService.createCategory(data as Category).subscribe(
          {
            next: () => this._snackbarService.showSnackbar('Categoría guardada correctamente!'), 
            error: (err) => {
              this._snackbarService.showSnackbar('Error al guardar categoría...');
              console.error(err);
            }
          }
        );
        break;
      case 'brand':
        this._brandService.createBrand(data as Brand).subscribe(
          {
            next: () => this._snackbarService.showSnackbar('Marca guardada correctamente!'), 
            error: (err) => {
              this._snackbarService.showSnackbar('Error al guardar marca...');
              console.error(err);
            }
          }
        );
        break;
      default:
        throw new Error('Invalid dataType');
    }
  }

  private _updateEntity(data: Product | Category | Brand): void {
    switch (this.dataType) {
      case 'product':
        this._productService.updateProduct(data as Product).subscribe({
          next: () => this._snackbarService.showSnackbar('Producto guardado correctamente!'), 
          error: (err) => {
            this._snackbarService.showSnackbar('Error al guardar producto...');
            console.error(err);
          }
        });
        break;
      case 'category':
        this._categoryService.updateCategory(data as Category).subscribe({
          next: () => this._snackbarService.showSnackbar('Categoría guardada correctamente!'), 
          error: (err) => {
            this._snackbarService.showSnackbar('Error al guardar categoría...');
            console.error(err);
          }
        });
        break;
      case 'brand':
        this._brandService.updateBrand(data as Brand).subscribe({
          next: () => this._snackbarService.showSnackbar('Marca guardada correctamente!'), 
          error: (err) => {
            this._snackbarService.showSnackbar('Error al guardar marca...');
            console.error(err);
          }
        });
        break;
      default:
        throw new Error('Invalid dataType');
    }
  }
}
