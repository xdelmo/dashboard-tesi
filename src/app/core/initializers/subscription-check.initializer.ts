import { inject } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { CustomerStatus } from '../models/customer.model';
import { forkJoin, map, of, firstValueFrom, switchMap } from 'rxjs';

export function subscriptionCheckInitializer() {
  const customerService = inject(CustomerService);

  // Return a promise because APP_INITIALIZER expects a Promise or Observable
  // We use firstValueFrom to convert the Observable to a Promise
  return firstValueFrom(
    customerService.getCustomers().pipe(
      switchMap((customers) => {
        const now = new Date();
        const updateRequests: any[] = [];

        customers.forEach((customer) => {
          if (
            customer.subscriptionEndDate &&
            customer.status === CustomerStatus.Active
          ) {
            const endDate = new Date(customer.subscriptionEndDate);
            // Normalize to start of day or direct comparison?
            // Direct comparison: if expiry date is in the past.
            if (endDate < now) {
              console.log(
                `[Auto-Expire] Customer ${customer.name} expired on ${customer.subscriptionEndDate}`,
              );
              updateRequests.push(
                customerService.updateCustomer(customer.id, {
                  status: CustomerStatus.Expired,
                }),
              );
            }
          }
        });

        if (updateRequests.length > 0) {
          return forkJoin(updateRequests);
        }
        return of(null);
      }),
    ),
  );
}
