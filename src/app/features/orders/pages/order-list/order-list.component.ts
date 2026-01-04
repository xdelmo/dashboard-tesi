import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  private orderService = inject(OrderService);

  orders = toSignal(this.orderService.getOrders(), { initialValue: [] });
}
