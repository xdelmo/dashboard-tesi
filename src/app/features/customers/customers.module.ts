import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';

// Verifica che questo percorso punti esattamente al file che hai modificato sopra
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';

@NgModule({
  declarations: [CustomerListComponent, CustomerModalComponent, CustomerDetailComponent],
  imports: [CommonModule, FormsModule, CustomersRoutingModule, SharedModule],
})

export class CustomersModule {}
