import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Customer } from '../../../../core/models/customer.model';
import { CustomerService } from '../../../../core/services/customer.service';

import { Location } from '@angular/common';

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
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.refreshData();
  }

  // Ricarica i dati del cliente in base all'ID presente nella rotta a seguito di modifica
  refreshData(): void {
    this.customer$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          return this.customerService.getCustomer(id);
        }
        return new Observable<Customer>(); // Return empty if no ID (should handle better practically)
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
