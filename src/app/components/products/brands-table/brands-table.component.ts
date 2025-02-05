import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, takeUntil } from 'rxjs';

import { TableComponent } from '../../shared/table/table.component';
import { BrandsService } from '../../../services/brands.service';
import { Brand, brandKeys } from '../../../models/brand.interface';

@Component({
  selector: 'admin-brands-table',
  templateUrl: './brands-table.component.html',
  styleUrl: './brands-table.component.scss',
  imports: [TableComponent],
})
export class BrandsTableComponent implements OnInit, OnDestroy {
  private _brandsService: BrandsService = inject(BrandsService);
  private _destroy$ = new Subject<void>();
  public brands$!: Observable<Brand[]>;
  public displayedColumns: string[] = brandKeys;
  public displayedHeaders: string[] = ['Id', 'Nombre'];

  ngOnInit() {
    this.brands$ = this._brandsService
      .getBrands()
      .pipe(takeUntil(this._destroy$));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
