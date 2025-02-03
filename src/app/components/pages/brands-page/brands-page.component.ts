import { Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TableComponent } from '../../shared/table/table.component';
import { BrandsService } from '../../services/brands.service';
import { Brand, brandKeys } from '../../models/brand.interface';

@Component({
  selector: 'admin-brands-page',
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.scss',
  standalone: true,
  imports: [TableComponent],
})
export class BrandsPageComponent implements OnInit {
  private _brandsService: BrandsService = inject(BrandsService);
  public brands$!: Observable<Brand[]>;
  public displayedColumns: string[] = brandKeys;
  public displayedHeaders: string[] = ['Id', 'Nombre'];

  ngOnInit() {
    this.brands$ = this._brandsService.getBrands();
  }
}
