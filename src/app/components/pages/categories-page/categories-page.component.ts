import { Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TableComponent } from '../../shared/table/table.component';
import { CategoriesService } from '../../services/categories.service';
import { Category, categoryKeys } from '../../models/category.interface';

@Component({
  selector: 'admin-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss',
  imports: [TableComponent],
})
export class CategoriesPageComponent implements OnInit {
  private _categoriesService: CategoriesService = inject(CategoriesService);
  public categories$!: Observable<Category[]>;
  public displayedColumns: string[] = categoryKeys;
  public displayedHeaders: string[] = ['Id', 'Nombre', 'Imagen'];

  ngOnInit() {
    this.categories$ = this._categoriesService.getCategories();
  }
}
