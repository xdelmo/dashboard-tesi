import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';

import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

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

    InputTextModule,
    InputNumberModule,
    SelectModule,
    ButtonModule,
    MessageModule,
    TableModule,
    DialogModule,
  ],
})
export class CustomersModule {}
