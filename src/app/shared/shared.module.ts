import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { StatusTagComponent } from './components/status-tag/status-tag.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';

@NgModule({
  declarations: [
    RevenueChartComponent,
    StatCardComponent,
    PageHeaderComponent,
    StatusTagComponent,
    EmptyStateComponent,
  ],
  imports: [CommonModule, ChartModule, CardModule, TagModule],
  exports: [
    RevenueChartComponent,
    StatCardComponent,
    PageHeaderComponent,
    ChartModule,
    CardModule,
    TagModule,
    StatusTagComponent,
    EmptyStateComponent,
  ],
})
export class SharedModule {}
