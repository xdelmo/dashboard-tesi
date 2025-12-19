import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '../../../../core/services/data.services';
import { Customer } from '../../../../core/models/customer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  private dataService = inject(DataService);

  // Definiamo i flussi di dati come Signals (lettura sincrona reattiva)
  customers = toSignal(this.dataService.getCustomers());
  totalRevenue = toSignal(this.dataService.getTotalRevenue());
}
