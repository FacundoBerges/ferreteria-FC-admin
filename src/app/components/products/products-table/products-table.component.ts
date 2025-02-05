import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { TableComponent } from '../../shared/table/table.component';
import { ProductsService } from '../../../services/products.service';
import { productKeys, ProductTable } from '../../../models/product.interface';

@Component({
  selector: 'admin-products-table',
  imports: [TableComponent],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
})
export class ProductsTableComponent implements OnInit {
  private _productsService: ProductsService = inject(ProductsService);
  private _router: Router = inject(Router);
  public products$!: Observable<ProductTable[]>;
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

  public handleAddProduct(): void {
    this._router.navigate(['products', 'add']);
  }

  public goToProduct(productId: number): void {
    this._router.navigate(['products', productId]);
  }

  public deleteProduct(productId: number): void {
    this._productsService.deleteProduct(productId);
  }

  public editProduct(productId: number): void {
    this._router.navigate(['products', 'edit', productId]);
  }
}
