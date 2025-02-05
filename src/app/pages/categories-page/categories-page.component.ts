import { Component } from '@angular/core';

import { AddNavigationComponent } from '../../components/shared/add-navigation/add-navigation.component';
import { CategoriesTableComponent } from '../../components/products/categories-table/categories-table.component';

@Component({
  selector: 'admin-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss',
  imports: [AddNavigationComponent, CategoriesTableComponent],
})
export class CategoriesPageComponent {}
