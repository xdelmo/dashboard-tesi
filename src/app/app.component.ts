import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CustomerService } from './core/services/customer.service';
import { MessageService } from 'primeng/api';
import { switchMap, catchError, of, forkJoin, Observable } from 'rxjs';
import { CustomerStatus } from './core/models/customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
})
export class AppComponent implements OnInit {
  title = 'dashboard-tesi';

  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.checkSubscriptionExpirations();
  }

  private checkSubscriptionExpirations() {
    this.customerService
      .getCustomers()
      .pipe(
        switchMap((customers) => {
          const now = new Date();
          const updateRequests: Observable<any>[] = [];

          customers.forEach((customer) => {
            if (
              customer.subscriptionEndDate &&
              customer.status === CustomerStatus.Active
            ) {
              const endDate = new Date(customer.subscriptionEndDate);

              if (endDate < now) {
                console.log(
                  `[Auto-Expire] Customer ${customer.name} expired on ${customer.subscriptionEndDate}`,
                );
                updateRequests.push(
                  this.customerService.updateCustomer(customer.id, {
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
        catchError((err) => {
          console.error(
            '[SubscriptionCheck] Failed to run startup check.',
            err,
          );
          this.messageService.add({
            severity: 'warn',
            summary: 'Attenzione',
            detail:
              'Impossibile verificare la scadenza degli abbonamenti. Il server potrebbe essere sovraccarico (Errore 507).',
            life: 5000,
          });
          return of(null);
        }),
      )
      .subscribe();
  }
}
