import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerStatus } from '../../../../core/models/customer.model';

import { DataService } from '../../../../core/services/data.services';

// --- INIZIO DECORATORE (Questo è il pezzo che mancava o era rotto) ---
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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.customers$ = this.dataService.getCustomers();
    this.totalRevenue$ = this.dataService.getTotalRevenue();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveCustomer(customer: Partial<Customer>): void {
    this.dataService.addCustomer(customer).subscribe(() => {
      this.refreshData();
      this.closeModal();
    });
  }
}

