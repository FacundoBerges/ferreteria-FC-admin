import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { DataType, FormType } from '../../../types/data-type.type';
import { Product } from '../../../models/product.interface';
import { Category } from '../../../models/category.interface';
import { Brand } from '../../../models/brand.interface';
import { FileInputComponent } from '../../shared/file-input/file-input.component';

@Component({
  selector: 'admin-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrl: './add-edit-form.component.scss',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FileInputComponent,
  ],
})
export class AddEditFormComponent implements OnInit {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  @Input()
  public dataType!: DataType;
  @Input()
  public data?: Product | Category | Brand;
  @Input()
  public formType: FormType = 'create';
  public form!: FormGroup;
  @Output()
  public formSubmit: EventEmitter<Product | Category | Brand> =
    new EventEmitter();

  ngOnInit(): void {
    if (!this.dataType) throw new Error('dataType is required');

    this._initializeFormGroup();
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
      description: [
        (this?.data as Product)?.description || '',
        [Validators.required],
      ],
      code: [(this?.data as Product)?.code || '', [Validators.required]],
      price: [(this?.data as Product)?.price || '', [Validators.required]],
      imgUrl: [(this?.data as Product)?.imgUrl || '', [Validators.required]],
      brand: [(this?.data as Product)?.brand || '', [Validators.required]],
      category: [
        (this?.data as Product)?.category || '',
        [Validators.required],
      ],
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

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

  private _submitBrand(): void {
    const brand: Brand = {
      id: (this?.data as Brand)?.id,
      name: this.form.value.name,
    };

    this.formSubmit.emit(brand);
  }

  private _submitCategory(): void {
    const category: Category = {
      id: (this?.data as Category)?.id,
      name: this.form.value.name,
      imgUrl: this.form.value.imgUrl,
    };

    this.formSubmit.emit(category);
  }

  private _submitProduct(): void {
    const product: Product = {
      id: (this?.data as Product)?.id,
      description: this.form.value.description,
      code: this.form.value.code,
      price: this.form.value.price,
      imgUrl: this.form.value.imgUrl,
      brand: this.form.value.brand,
      category: this.form.value.category,
    };

    this.formSubmit.emit(product);
  }
}
