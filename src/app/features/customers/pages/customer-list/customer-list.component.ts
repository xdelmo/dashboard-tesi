import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerStatus } from '../../../../core/models/customer.model';

import { CustomerService } from '../../../../core/services/customer.service';

// --- INIZIO DECORATORE 
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  standalone: false,
})
// --- FINE DECORATORE ---
export class CustomerListComponent implements OnInit {
  customers$!: Observable<Customer[]>;
  totalRevenue$!: Observable<number>;

  isModalOpen = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.customers$ = this.customerService.getCustomers();
    this.totalRevenue$ = this.customerService.getTotalRevenue();
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


