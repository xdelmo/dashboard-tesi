import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  Customer,
  CustomerStatus,
} from '../../../../core/models/customer.model';
import { OrderService } from '../../../../core/services/order.service';
import { OrderStatus } from '../../../../core/models/order.model';

import { CustomerService } from '../../../../core/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  standalone: false,
})
export class CustomerListComponent {
  private customerService = inject(CustomerService);

  private refresh$ = new BehaviorSubject<void>(undefined);
  isModalOpen = false;

  customers = toSignal(
    this.refresh$.pipe(switchMap(() => this.customerService.getCustomers()))
  );

  refreshData(): void {
    this.refresh$.next();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveCustomer(customer: Partial<Customer>): void {
    this.customerService.addCustomer(customer).subscribe(() => {
      this.refreshData();
      this.closeModal();
    });
  }
}
