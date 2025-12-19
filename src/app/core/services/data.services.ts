import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Customer } from '../models/customer.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // Recupera i clienti dal JSON Server
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_CONFIG.baseUrl}/customers`);
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
