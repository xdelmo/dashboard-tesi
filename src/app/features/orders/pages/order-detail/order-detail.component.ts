import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CustomerService } from '../../../../core/services/customer.service';
import { Customer } from '../../../../core/models/customer.model';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/models/order.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  standalone: false,
})
export class OrderDetailComponent implements OnInit {
  order$!: Observable<Order & { customer: Customer | undefined }>;

  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
  private location = inject(Location);

  ngOnInit(): void {
    this.order$ = this.route.paramMap.pipe(
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
            })
          );
        }
        return new Observable<Order & { customer: Customer | undefined }>();
      })
    );
  }

  goBack(): void {
    this.location.back();
  }
}
