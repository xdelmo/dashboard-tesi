import { Component, inject, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomerService } from '../../../../core/services/customer.service';
import { OrderService } from '../../../../core/services/order.service';
import { CustomerStatus } from '../../../../core/models/customer.model';
import { OrderStatus } from '../../../../core/models/order.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, SharedModule],
})
export class HomeComponent {
  private customerService = inject(CustomerService);
  private orderService = inject(OrderService);

  // Definiamo i flussi di dati come Signals (lettura sincrona reattiva)
  customers = toSignal(this.customerService.getCustomers(), {
    initialValue: [],
  });
  orders = toSignal(this.orderService.getOrders(), { initialValue: [] });

  // Statistiche calcolate
  totalRevenue = computed(() => {
    return this.orders()
      .filter((o) => o.status === OrderStatus.Paid)
      .reduce((acc, curr) => acc + curr.total, 0);
  });

  totalCustomers = computed(() => this.customers().length);

  activeCustomers = computed(() => {
    return this.customers().filter((c) => c.status === CustomerStatus.Active)
      .length;
  });

  pendingOrders = computed(() => {
    return this.orders().filter((o) => o.status === OrderStatus.Pending).length;
  });

  // Gestione anno selezionato per il grafico
  selectedYear = signal(new Date().getFullYear());
  years = [2026, 2025, 2024];

  onYearChange(event: any): void {
    this.selectedYear.set(event.value);
  }
}
