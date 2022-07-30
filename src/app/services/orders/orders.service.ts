import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Order {
  id: number;
  date: string;
  name: string;
  status: string;
  orderTotal: number;
  paymentMode: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = 'http://localhost:3000/Order';

  constructor(private http: HttpClient) {}

  getOrders(
    offset: number,
    pageSize: number,
    sortField: string,
    sortDirection: string
  ): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl).pipe(
      map((response) => {
        return this.getPagedData(
          this.getSortedData(response, sortField, sortDirection),
          offset,
          pageSize
        );
      }),
      catchError(this.handleError)
    );
  }

  getOrderCount(): Observable<number> {
    return this.http.get<Order[]>(this.ordersUrl).pipe(
      map((response) => {
        return response.length;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    return throwError(errorMessage);
  }

  private getPagedData(data: Order[], startIndex: number, pageSize: number) {
    return data.splice(startIndex, pageSize);
  }

  private getSortedData(data: Order[], active: string, direction: string) {
    if (!active || direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = direction === 'asc';
      switch (active) {
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'date':
          return compare(+a.date, +b.date, isAsc);
        case 'name':
          return compare(+a.name, +b.name, isAsc);
        case 'status':
          return compare(+a.status, +b.status, isAsc);
        case 'orderTotal':
          return compare(+a.orderTotal, +b.orderTotal, isAsc);
        case 'paymentMode':
          return compare(+a.paymentMode, +b.paymentMode, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
