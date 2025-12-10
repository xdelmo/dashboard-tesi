import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';

// Verifica che questo percorso punti esattamente al file che hai modificato sopra
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [CommonModule, CustomersRoutingModule, SharedModule],
})
export class CustomersModule {}
