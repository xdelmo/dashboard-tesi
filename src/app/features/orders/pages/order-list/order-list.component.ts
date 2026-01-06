import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderService } from '../../../../core/services/order.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { CustomerStatsService } from '../../../../core/services/customer-stats.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
  private customerStatsService = inject(CustomerStatsService);
  private messageService = inject(MessageService);

  private refresh$ = new BehaviorSubject<void>(undefined);

  orders = toSignal(
    this.refresh$.pipe(switchMap(() => this.orderService.getOrders())),
    { initialValue: [] }
  );
  customers = toSignal(this.customerService.getCustomers(), {
    initialValue: [],
  });

  enrichedOrders = computed(() => {
    const orders = this.orders();
    const customers = this.customers();
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
              })
            );
        })
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successo',
          detail: 'Ordine creato e statistiche aggiornate',
        });
        this.refresh$.next();
        this.closeModal();
      });
  }
}
