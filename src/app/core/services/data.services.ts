import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Dati finti per simulare il Database
  private mockCustomers: Customer[] = [
    {
      id: 1,
      name: 'Mario Rossi',
      email: 'mario@test.com',
      company: 'Tech Spa',
      status: 'Active',
      revenue: 12000,
    },
    {
      id: 2,
      name: 'Luca Bianchi',
      email: 'luca@demo.it',
      company: 'Consulting Srl',
      status: 'Pending',
      revenue: 5000,
    },
    {
      id: 3,
      name: 'Giulia Verdi',
      email: 'giulia@web.com',
      company: 'Design Studio',
      status: 'Active',
      revenue: 8500,
    },
    {
      id: 4,
      name: 'Anna Neri',
      email: 'anna@store.it',
      company: 'E-commerce Plus',
      status: 'Inactive',
      revenue: 0,
    },
    {
      id: 5,
      name: 'Paolo Gialli',
      email: 'paolo@logistica.eu',
      company: 'Fast Delivery',
      status: 'Active',
      revenue: 45000,
    },
  ];

  constructor() {}

  // Metodo che simula una chiamata HTTP (ritorna un Observable dopo 800ms)
  getCustomers(): Observable<Customer[]> {
    return of(this.mockCustomers).pipe(delay(800));
  }

  // Metodo per calcolare il totale fatturato (logica di business)
  getTotalRevenue(): Observable<number> {
    const total = this.mockCustomers.reduce(
      (acc, curr) => acc + curr.revenue,
      0
    );
    return of(total);
  }
}
