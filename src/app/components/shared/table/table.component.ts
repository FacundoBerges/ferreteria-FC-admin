import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

import { Observable } from 'rxjs';

import { Brand } from '../../../models/brand.interface';
import { ProductTable } from '../../../models/product.interface';
import { Category } from '../../../models/category.interface';

@Component({
  selector: 'admin-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class TableComponent<T extends Brand | Category | ProductTable> implements OnChanges, AfterViewInit {
  @Input() public data$!: Observable<T[]>;
  @Input() public displayedColumns: string[] = [];
  @Input() public displayedHeaders: string[] = this.displayedColumns;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<T>; 
  public dataSource!: MatTableDataSource<T>;

  constructor() {
    this.dataSource = new MatTableDataSource<T>(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data$'] && this.data$) {
      this.data$.subscribe((data) => {
        this.dataSource.data = data;
      });
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
