import { Component } from '@angular/core';

import { AddNavigationComponent } from '../../components/shared/add-navigation/add-navigation.component';
import { ProductsTableComponent } from '../../components/products/products-table/products-table.component';

@Component({
  selector: 'admin-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  imports: [AddNavigationComponent, ProductsTableComponent],
})
export class ProductsPageComponent {}
