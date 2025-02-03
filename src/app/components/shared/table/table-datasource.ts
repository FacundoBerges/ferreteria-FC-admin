import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { Brand } from '../../models/brand.interface';
import { Category } from '../../models/category.interface';
import { ProductDetails } from '../../models/product.interface';

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<
  Brand | Category | ProductDetails
> {
  data: Brand[] | Category[] | ProductDetails[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(initialData: Brand[] | Category[] | ProductDetails[]) {
    super();
    this.data = initialData;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<(Brand | Category | ProductDetails)[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(
    data: (Brand | Category | ProductDetails)[]
  ): (Brand | Category | ProductDetails)[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(
    data: (Brand | Category | ProductDetails)[]
  ): (Brand | Category | ProductDetails)[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'name':
          return !isProduct(a) && !isProduct(b)
            ? compare(a.name, b.name, isAsc)
            : 0;
        case 'code':
          return isProduct(a) && isProduct(b)
            ? compare(a.code, b.code, isAsc)
            : 0;
        case 'description':
          return isProduct(a) && isProduct(b)
            ? compare(a.code, b.code, isAsc)
            : 0;
        default:
          return 0;
      }
    });
  }
}

/** Type guard to check if the item is Product */
function isProduct(
  item: Brand | Category | ProductDetails
): item is ProductDetails {
  return (item as ProductDetails).code !== undefined;
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
