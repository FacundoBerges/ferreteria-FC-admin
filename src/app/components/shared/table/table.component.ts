import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

import { Brand } from '../../../models/brand.interface';
import { Category } from '../../../models/category.interface';
import { ProductTable } from '../../../models/product.interface';

@Component({
  selector: 'admin-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterLink],
})
export class TableComponent<T extends Brand | Category | ProductTable> implements OnChanges, AfterViewInit {
  @Input() public data$!: Observable<T[]>;
  @Input() public displayedColumns: string[] = [];
  @Input() public displayedHeaders: string[] = this.displayedColumns;
  @Input() public route: string = '/productos';
  @Output() public delete: EventEmitter<T> = new EventEmitter<T>();

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
        this.dataSource.data = data.sort((a, b) => (a.id && b.id) ? a.id - b.id : 0);
      });
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public deleteElement(element: T): void {
    this.delete.emit(element);
  }
}
