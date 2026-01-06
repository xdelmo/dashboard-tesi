import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { SharedModule } from '../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderModalComponent } from './components/order-modal/order-modal.component';

@NgModule({
  declarations: [OrderListComponent, OrderModalComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DatePickerModule,
    InputNumberModule,
    SelectModule,
    MultiSelectModule,
    ReactiveFormsModule,
  ],
})
export class OrdersModule {}
