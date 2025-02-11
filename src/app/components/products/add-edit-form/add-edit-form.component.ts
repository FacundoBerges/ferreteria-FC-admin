import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { combineLatest, Observable, Subscription } from 'rxjs';

import { FileInputComponent } from '../../shared/file-input/file-input.component';
import { DataType, FormType } from '../../../types/data-type.type';
import { Brand } from '../../../models/brand.interface';
import { Category } from '../../../models/category.interface';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'admin-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrl: './add-edit-form.component.scss',
  imports: [
    FileInputComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class AddEditFormComponent implements OnInit, OnDestroy {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  @Input() public dataType!: DataType;
  @Input() public data?: Product | Category | Brand;
  @Input() public formType: FormType = 'create';
  @Input() public brands$?: Observable<Brand[]>;
  @Input() public categories$?: Observable<Category[]>;
  @Output() public imageFile = new EventEmitter<File>();
  @Output() public formSubmit = new EventEmitter<Product | Category | Brand>();
  private _productSubscriptions?: Subscription;
  public form!: FormGroup;
  public brands: Brand[] = [];
  public categories: Category[] = [];

  ngOnInit(): void {
    if (!this.dataType) throw new Error('dataType is required');

    this._initializeFormGroup();

    if (this.dataType === 'product' && this.brands$ && this.categories$) {
      this._productSubscriptions = combineLatest([this.brands$, this.categories$]).subscribe(([brands, categories]) => {
          this.brands = brands;
          this.categories = categories;

          if (this.form && (this.formType === 'create' || (this.data && (this.data as Product).brand && (this.data as Product).category))) {
            this.form.patchValue({
              brand: (this.data as Product)?.brand || null,
              category: (this.data as Product)?.category || null,
            });

            this._changeDetectorRef.detectChanges();
          }

          this.brands = brands.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()));
          this.categories = categories.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()));
        }
      );
    }
  }

  ngOnDestroy(): void {
    this._productSubscriptions?.unsubscribe();
  }

  private _initializeFormGroup(): void {
    switch (this.dataType) {
      case 'product':
        this._setProductGroup();
        break;
      case 'category':
        this._setCategoryGroup();
        break;
      case 'brand':
        this._setBrandGroup();
        break;
      default:
        throw new Error('Invalid dataType');
    }
  }

  private _setBrandGroup(): void {
    this.form = this._formBuilder.group({
      name: [
        (this?.data as Brand)?.name || '',
        [Validators.required, Validators.minLength(1)],
      ],
    });
  }

  private _setCategoryGroup(): void {
    this.form = this._formBuilder.group({
      name: [
        (this?.data as Category)?.name || '',
        [Validators.required, Validators.minLength(1)],
      ],
      imgUrl: [(this?.data as Category)?.imgUrl || ''],
    });
  }

  private _setProductGroup(): void {
    this.form = this._formBuilder.group({
      description: [(this.data as Product)?.description || '', [Validators.required, Validators.minLength(3)]],
      code: [(this.data as Product)?.code || '', [Validators.required, Validators.minLength(1)]],
      imgUrl: [(this.data as Product)?.imgUrl || ''],
      brand: [(this.data as Product)?.brand],
      category: [(this.data as Product)?.category, [Validators.required]],
    });

    if (this.data && this.dataType === 'product') {
      this.form.patchValue({
        description: (this.data as Product).description,
        code: (this.data as Product).code,
        imgUrl: (this.data as Product).imgUrl,
        brand: (this.data as Product).brand,
        category: (this.data as Product).category,
      });
    }
  }

  private _submitBrand(): void {
    const brand: Brand = {
      id: (this.data as Brand)?.id,
      name: this.form.value.name,
    };

    this.formSubmit.emit(brand);
  }

  private _submitCategory(): void {
    const category: Category = {
      id: (this.data as Category)?.id,
      name: this.form.value.name,
      imgUrl: (this.data as Category)?.imgUrl,
    };

    this.formSubmit.emit(category);
  }

  private _submitProduct(): void {
    const product: Product = {
      id: (this.data as Product)?.id,
      description: this.form.value.description,
      code: this.form.value.code,
      imgUrl: (this.data as Product)?.imgUrl,
      brand: this.form.value.brand,
      category: this.form.value.category,
    };

    this.formSubmit.emit(product);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    switch (this.dataType) {
      case 'product':
        this._submitProduct();
        break;
      case 'category':
        this._submitCategory();
        break;
      case 'brand':
        this._submitBrand();
        break;
      default:
        throw new Error('Invalid dataType');
    }
  }

  public onFileSelected(file: File): void {
    this.imageFile.emit(file);
  }

  public onFileCancelled(): void {
    this.imageFile.emit(undefined);
  }

  public compareBrand(brand1: Brand | null, brand2: Brand | null): boolean {
    return brand1?.id === brand2?.id;
  }

  public compareCategory(category1: Category | null, category2: Category | null): boolean {
    return category1?.id === category2?.id;
  }
}
