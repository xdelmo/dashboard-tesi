import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../../../core/services/data.services';
import { Customer } from '../../../../core/models/customer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  // Definiamo i flussi di dati (non i dati stessi!)
  customers$!: Observable<Customer[]>;
  totalRevenue$!: Observable<number>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Colleghiamo il tubo. Non succede nulla finché l'HTML non lo chiede (lazy)
    this.customers$ = this.dataService.getCustomers();
    this.totalRevenue$ = this.dataService.getTotalRevenue();
  }
}
