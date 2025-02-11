import { Component, inject, OnInit } from '@angular/core';

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
  public products$!: Observable<ProductTable[]>;
  public displayedColumns: string[] = productKeys;
  public displayedHeaders: string[] = [
    'Id',
    'Código',
    'Descripción',
    'Imagen',
    'Marca',
    'Categoría',
    'Acciones'
  ];

  ngOnInit(): void {
    this.products$ = this._productsService.getProducts();
  }

  public onDelete(product: ProductTable): void {
    if (!product.id) 
      throw new Error('Product id is required');

    if (! confirm(`¿Estás seguro de que deseas eliminar el producto ${product.description}?`)) return;

    this._productsService.deleteProduct(product.id);
  }
}
