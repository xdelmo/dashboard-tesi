import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatusTagComponent } from '../../shared/components/status-tag/status-tag.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrderModalComponent } from './components/order-modal/order-modal.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [OrderListComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    PageHeaderComponent,
    StatusTagComponent,
    EmptyStateComponent,
    LoadingStateComponent,
    TableModule,
    ButtonModule,
    DialogModule,
    DatePickerModule,
    InputNumberModule,
    SelectModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ToastModule,
    OrderModalComponent,
  ],
  providers: [MessageService],
})
export class OrdersModule {}
