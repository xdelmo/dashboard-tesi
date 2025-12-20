import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomerService } from '../../../../core/services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  private customerService = inject(CustomerService);
  // Definiamo i flussi di dati come Signals (lettura sincrona reattiva)
  customers = toSignal(this.customerService.getCustomers());
  totalRevenue = toSignal(this.customerService.getTotalRevenue());
}