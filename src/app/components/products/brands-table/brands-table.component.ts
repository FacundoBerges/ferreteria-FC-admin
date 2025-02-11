import { Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TableComponent } from '../../shared/table/table.component';
import { BrandsService } from '../../../services/brands.service';
import { Brand, brandKeys } from '../../../models/brand.interface';

@Component({
  selector: 'admin-brands-table',
  templateUrl: './brands-table.component.html',
  styleUrl: './brands-table.component.scss',
  imports: [TableComponent],
})
export class BrandsTableComponent implements OnInit {
  private _brandsService: BrandsService = inject(BrandsService);
  public brands$!: Observable<Brand[]>;
  public displayedColumns: string[] = brandKeys;
  public displayedHeaders: string[] = ['Id', 'Nombre', 'Acciones'];

  ngOnInit() {
    this.brands$ = this._brandsService.getBrands()
  }

  onDelete(brand: Brand): void {
    if (!brand.id) 
      throw new Error('Brand id is required');

    if (confirm(`¿Estás seguro de que deseas eliminar la marca ${brand.name}?`)) return;
    
    this._brandsService.deleteBrand(brand.id);
  }
}
