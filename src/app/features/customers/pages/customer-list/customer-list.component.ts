import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../../../core/models/customer.model';
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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Colleghiamo il tubo. Non succede nulla finché l'HTML non lo chiede (lazy)
    this.customers$ = this.dataService.getCustomers();
    this.totalRevenue$ = this.dataService.getTotalRevenue();
  }
}
