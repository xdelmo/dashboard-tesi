import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderService } from '../../../../core/services/order.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
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
      return {
        ...order,
        customerName: customer ? customer.name : 'Unknown Customer',
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
    this.orderService.addOrder(order).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successo',
        detail: 'Ordine creato correttamente',
      });
      this.refresh$.next();
      this.closeModal();
    });
  }
}
