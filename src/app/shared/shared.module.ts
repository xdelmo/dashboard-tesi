import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [RevenueChartComponent, StatCardComponent, PageHeaderComponent],
  imports: [CommonModule, BaseChartDirective, CardModule],
  exports: [
    RevenueChartComponent,
    StatCardComponent,
    PageHeaderComponent,
    CardModule,
  ],
})
export class SharedModule {}
