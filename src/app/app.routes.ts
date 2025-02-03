import { Routes } from '@angular/router';

import { ProductsPageComponent } from './components/pages/products-page/products-page.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { BrandsPageComponent } from './components/pages/brands-page/brands-page.component';

export const routes: Routes = [
  { path: 'categorias', component: CategoriesPageComponent },
  { path: 'marcas', component: BrandsPageComponent },
  { path: 'productos', component: ProductsPageComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
];
