import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  declarations: [HomeComponent, DataTableComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
