import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CustomerService } from '../../../../core/services/customer.service';
import { OrderService } from '../../../../core/services/order.service';
import { OrderStatus } from '../../../../core/models/order.model';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusTagComponent } from '../../../../shared/components/status-tag/status-tag.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    PageHeaderComponent,
    StatusTagComponent,
  ],
})
export class OrderDetailComponent {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
  private location = inject(Location);

  order = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          return combineLatest([
            this.orderService.getOrder(id),
            this.customerService.getCustomers(),
          ]).pipe(
            map(([order, customers]) => {
              const customer = customers.find((c) => c.id === order.customerId);
              return { ...order, customer };
            }),
          );
        }
        return of(undefined);
      }),
    ),
  );

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.goBack();
    });
  }

  isPending(status: OrderStatus): boolean {
    return status === OrderStatus.Pending;
  }

  goBack(): void {
    this.location.back();
  }
}
