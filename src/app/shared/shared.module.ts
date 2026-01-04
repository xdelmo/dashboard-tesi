import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { StatusTagComponent } from './components/status-tag/status-tag.component';

@NgModule({
  declarations: [
    RevenueChartComponent,
    StatCardComponent,
    PageHeaderComponent,
    StatusTagComponent,
  ],
  imports: [CommonModule, BaseChartDirective, CardModule, TagModule],
  exports: [
    RevenueChartComponent,
    StatCardComponent,
    PageHeaderComponent,
    CardModule,
    TagModule,
    StatusTagComponent,
  ],
})
export class SharedModule {}
