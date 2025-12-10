import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { StatCardComponent } from './components/stat-card/stat-card.component';

@NgModule({
  declarations: [RevenueChartComponent, StatCardComponent],
  imports: [CommonModule, BaseChartDirective],
  exports: [RevenueChartComponent, StatCardComponent],
})
export class SharedModule {}
