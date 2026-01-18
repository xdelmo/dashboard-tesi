import { Component, computed, inject, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { OrderService } from '../../../../core/services/order.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { CustomerStatsService } from '../../../../core/services/customer-stats.service';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusTagComponent } from '../../../../shared/components/status-tag/status-tag.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { LoadingStateComponent } from '../../../../shared/components/loading-state/loading-state.component';
import { OrderModalComponent } from '../../components/order-modal/order-modal.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    TableModule,
    ButtonModule,
    PageHeaderComponent,
    StatusTagComponent,
    EmptyStateComponent,
    LoadingStateComponent,
    OrderModalComponent,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
  private customerStatsService = inject(CustomerStatsService);
  private messageService = inject(MessageService);

  private refreshTrigger = signal(0);

  orders = toSignal(
    toObservable(this.refreshTrigger).pipe(
      switchMap(() => this.orderService.getOrders()),
    ),
  );
  // Nota: Rimuoviamo initialValue per permettere lo stato "undefined" (= loading)
  customers = toSignal(this.customerService.getCustomers());

  enrichedOrders = computed(() => {
    const orders = this.orders();
    const customers = this.customers();

    // Se uno dei due non è ancora caricato, restituiamo undefined per mostrare il loader
    if (!orders || !customers) {
      return undefined;
    }

    return orders.map((order) => {
      const customer = customers.find((c) => c.id === order.customerId);
      const uniqueCategories = [
        ...new Set(order.items?.map((i) => i.category) || []),
      ];
      return {
        ...order,
        customerName: customer ? customer.name : 'Unknown Customer',
        uniqueCategories,
      };
    });
  });

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveOrder(order: any) {
    this.orderService
      .addOrder(order)
      .pipe(
        switchMap((newOrder) => {
          return this.customerStatsService
            .getStatsByCustomerId(newOrder.customerId)
            .pipe(
              switchMap((stats) => {
                const stat = stats[0] || {
                  id: 'cs-' + new Date().getTime(),
                  customerId: newOrder.customerId,
                  totalRevenue: 0,
                  totalOrders: 0,
                };

                if (newOrder.status === 'Pagato') {
                  stat.totalRevenue += newOrder.total;
                }
                stat.totalOrders += 1;
                stat.lastOrderDate = new Date().toISOString();

                if (stats[0]) {
                  return this.customerStatsService.updateStats(stat);
                } else {
                  return this.customerStatsService.createStats(stat);
                }
              }),
            );
        }),
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successo',
          detail: 'Ordine creato e statistiche aggiornate',
        });
        this.refreshTrigger.update((n) => n + 1);
        this.closeModal();
      });
  }
}
