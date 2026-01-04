import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';

import { ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerModalComponent,
    CustomerDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    SharedModule,
    InputText,
    InputNumber,
    Select,
    Button,
    Message,
    TableModule,
  ],
})
export class CustomersModule {}
