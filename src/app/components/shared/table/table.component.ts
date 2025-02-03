import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

import { Observable } from 'rxjs';

import { Brand } from '../../models/brand.interface';
import { Product } from '../../models/product.interface';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'admin-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class TableComponent<T extends Brand | Category | Product>
  implements AfterViewInit
{
  @Input()
  public data$!: Observable<T[]>;
  @Input()
  public displayedColumns: string[] = [];
  @Input()
  public displayedHeaders: string[] = this.displayedColumns;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<T>;

  dataSource!: MatTableDataSource<T>;

  ngAfterViewInit(): void {
    if (this.data$) {
      this.data$.subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
    }
  }
}
