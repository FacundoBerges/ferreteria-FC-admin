import { Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TableComponent } from '../../shared/table/table.component';
import { ProductsService } from '../../services/products.service';
import { Product, productKeys } from '../../models/product.interface';

@Component({
  selector: 'admin-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  imports: [TableComponent],
})
export class ProductsPageComponent implements OnInit {
  private _productsService: ProductsService = inject(ProductsService);
  public products$!: Observable<Product[]>;
  public displayedColumns: string[] = productKeys;
  public displayedHeaders: string[] = [
    'Id',
    'Código',
    'Descripción',
    'Precio',
    'Imagen',
    'Marca',
    'Categoría',
  ];

  ngOnInit(): void {
    this.products$ = this._productsService.getProducts();
  }
}
