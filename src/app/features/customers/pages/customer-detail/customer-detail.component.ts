import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Customer } from '../../../../core/models/customer.model';
import { CustomerService } from '../../../../core/services/customer.service';

import { Location } from '@angular/common';
import { CustomerStatsService } from '../../../../core/services/customer-stats.service';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { CustomerModalComponent } from '../../components/customer-modal/customer-modal.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, SharedModule, ButtonModule, CustomerModalComponent],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
})
export class CustomerDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private location = inject(Location);
  private customerStatsService = inject(CustomerStatsService);

  private refreshTrigger = signal(0);
  isModalOpen = false;
  selectedCustomer: Customer | null = null;

  customer = toSignal(
    combineLatest([
      this.route.paramMap,
      toObservable(this.refreshTrigger),
    ]).pipe(
      switchMap(([params]) => {
        const id = params.get('id');
        if (id) {
          return combineLatest([
            this.customerService.getCustomer(id),
            this.customerStatsService.getStatsByCustomerId(id),
          ]).pipe(
            map(([customer, stats]) => {
              const stat = stats[0];
              return { ...customer, revenue: stat ? stat.totalRevenue : 0 };
            }),
          );
        }
        return of(undefined);
      }),
    ),
  );

  goBack(): void {
    this.location.back();
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
          this.refreshTrigger.update((n) => n + 1);
          this.closeModal();
        });
    }
  }
}
