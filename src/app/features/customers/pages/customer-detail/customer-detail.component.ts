import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Customer } from '../../../../core/models/customer.model';
import { CustomerService } from '../../../../core/services/customer.service';

import { Location } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';
import { OrderStatus } from '../../../../core/models/order.model';

@Component({
  selector: 'app-customer-detail',
  standalone: false,
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
})
export class CustomerDetailComponent implements OnInit {
  customer$!: Observable<Customer>;
  isModalOpen = false;
  selectedCustomer: Customer | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private location: Location,
    private orderService: OrderService
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.customer$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          return combineLatest([
            this.customerService.getCustomer(id),
            this.orderService.getOrders(),
          ]).pipe(
            map(([customer, orders]) => {
              const revenue = orders
                .filter(
                  (o) =>
                    o.customerId === customer.id &&
                    o.status === OrderStatus.Paid
                )
                .reduce((acc, curr) => acc + curr.amount, 0);
              return { ...customer, revenue };
            })
          );
        }
        return new Observable<Customer>();
      })
    );
  }

  deleteCustomer(id: string): void {
    if (confirm('Sei sicuro di voler eliminare questo cliente?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }

  openEditModal(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCustomer = null;
  }

  saveCustomer(customerData: Partial<Customer>): void {
    if (this.selectedCustomer) {
      this.customerService
        .updateCustomer(this.selectedCustomer.id, customerData)
        .subscribe(() => {
          this.refreshData();
          this.closeModal();
        });
    }
  }
}
