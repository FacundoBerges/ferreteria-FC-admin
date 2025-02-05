import { Routes } from '@angular/router';

import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { BrandsPageComponent } from './pages/brands-page/brands-page.component';
import { DataPageComponent } from './pages/data-page/data-page.component';

export const routes: Routes = [
  {
    path: 'categorias',
    children: [
      {
        path: '',
        component: CategoriesPageComponent,
      },
      {
        path: 'agregar',
        component: DataPageComponent,
        data: { dataType: 'category' },
      },
      {
        path: 'editar/:id',
        component: DataPageComponent,
        data: { dataType: 'category' },
      },
    ],
  },
  {
    path: 'marcas',
    children: [
      {
        path: '',
        component: BrandsPageComponent,
      },
      {
        path: 'agregar',
        component: DataPageComponent,
        data: { dataType: 'brand' },
      },
      {
        path: 'editar/:id',
        component: DataPageComponent,
        data: { dataType: 'brand' },
      },
    ],
  },
  {
    path: 'productos',
    children: [
      {
        path: '',
        component: ProductsPageComponent,
      },
      {
        path: 'agregar',
        component: DataPageComponent,
        data: { dataType: 'product' },
      },
      {
        path: 'editar/:id',
        component: DataPageComponent,
        data: { dataType: 'product' },
      },
    ],
  },
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: '**', redirectTo: '/productos' },
];
