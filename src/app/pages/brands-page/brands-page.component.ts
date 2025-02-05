import { Component } from '@angular/core';

import { AddNavigationComponent } from '../../components/shared/add-navigation/add-navigation.component';
import { BrandsTableComponent } from '../../components/products/brands-table/brands-table.component';

@Component({
  selector: 'admin-brands-page',
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.scss',
  standalone: true,
  imports: [AddNavigationComponent, BrandsTableComponent],
})
export class BrandsPageComponent {}
