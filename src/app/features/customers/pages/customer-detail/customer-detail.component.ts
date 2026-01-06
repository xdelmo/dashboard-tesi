import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Customer } from '../../../../core/models/customer.model';
import { CustomerService } from '../../../../core/services/customer.service';

import { Location } from '@angular/common';
import { CustomerStatsService } from '../../../../core/services/customer-stats.service';

@Component({
  selector: 'app-customer-detail',
  standalone: false,
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
})
export class CustomerDetailComponent implements OnInit {
  customer$!: Observable<Customer & { revenue: number }>;
  isModalOpen = false;
  selectedCustomer: Customer | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private location = inject(Location);
  private customerStatsService = inject(CustomerStatsService);

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
            this.customerStatsService.getStatsByCustomerId(id),
          ]).pipe(
            map(([customer, stats]) => {
              const stat = stats[0];
              return { ...customer, revenue: stat ? stat.totalRevenue : 0 };
            })
          );
        }
        return new Observable<Customer & { revenue: number }>();
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
