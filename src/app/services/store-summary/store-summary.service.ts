import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface StoreSummary{
  title: string;
  value: string;
  isIncrease: boolean;
  color: string;
  percentValue: string;
  icon: string;
  isCurrency: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StoreSummaryService {

  getStoreSummary(): Observable<StoreSummary[]> {
    return of([
      { title: "Total Sales", value: "9465", isIncrease: true, color: "primary", percentValue: "0.5383", icon: "payments", isCurrency: true },
      { title: "Average Order Value", value: "465", isIncrease: false, color: "accent", percentValue: "0.2544", icon: "local_atm", isCurrency: true },
      { title: "Total Orders", value: "243", isIncrease: true, color: "warn", percentValue: "0.4565", icon: "shopping_cart", isCurrency: false },
      { title: "Returning Customers", value: "35", isIncrease: false, color: "primary", percentValue: "0.8361", icon: "portrait", isCurrency: false }
    ]);
  }
}