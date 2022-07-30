import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  StoreSummary,
  StoreSummaryService
} from 'src/app/services/store-summary/store-summary.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          title: [],
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          card: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

      return {
        title: ['Primeiro'],
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        card: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  public miniCardData?: StoreSummary[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private summaryService: StoreSummaryService
  ) {}

  ngOnInit() {
    this.summaryService.getStoreSummary().subscribe({
      next: (summaryData) => {
        this.miniCardData = summaryData;
      },
    });
  }
}
