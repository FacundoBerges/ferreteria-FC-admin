import { Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TableComponent } from '../../shared/table/table.component';
import { CategoriesService } from '../../../services/categories.service';
import { Category, categoryKeys } from '../../../models/category.interface';

@Component({
  selector: 'admin-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
  imports: [TableComponent],
})
export class CategoriesTableComponent implements OnInit {
  private _categoriesService: CategoriesService = inject(CategoriesService);
  public categories$!: Observable<Category[]>;
  public displayedColumns: string[] = categoryKeys;
  public displayedHeaders: string[] = ['Id', 'Nombre', 'Imagen', 'Acciones'];

  ngOnInit() {
    this.categories$ = this._categoriesService.getCategories();
  }

  public onDelete(category: Category): void {
    if (!category.id) 
      throw new Error('Category id is required to delete a category');

    if (! confirm(`¿Estás seguro de que deseas eliminar la categoría ${category.name}?`)) return;

    this._categoriesService.deleteCategory(category.id);
  }
}
