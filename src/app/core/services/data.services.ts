import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  // Recupera i clienti dal JSON Server
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  // Calcola il totale fatturato recuperando i dati dal server
  getTotalRevenue(): Observable<number> {
    return this.getCustomers().pipe(
      map((customers) =>
        customers.reduce((acc, curr) => acc + curr.revenue, 0)
      )
    );
  }
}
