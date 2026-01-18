import { Component, inject, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Customer } from '../../../../core/models/customer.model';
import { CustomerStatsService } from '../../../../core/services/customer-stats.service';
import { CustomerService } from '../../../../core/services/customer.service';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CustomerModalComponent } from '../../components/customer-modal/customer-modal.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ButtonModule,
    TableModule,
    CustomerModalComponent,
  ],
})
export class CustomerListComponent {
  private customerService = inject(CustomerService);
  private customerStatsService = inject(CustomerStatsService);

  private refreshTrigger = signal(0);
  isModalOpen = false;

  customers = toSignal(
    toObservable(this.refreshTrigger).pipe(
      switchMap(() =>
        combineLatest([
          this.customerService.getCustomers(),
          this.customerStatsService.getAllStats(),
        ]).pipe(
          map(([customers, stats]) => {
            return customers.map((customer) => {
              const stat = stats.find((s) => s.customerId === customer.id);
              return {
                ...customer,
                revenue: stat ? stat.totalRevenue : 0,
              };
            });
          }),
        ),
      ),
    ),
  );

  refreshData(): void {
    this.refreshTrigger.update((n) => n + 1);
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
