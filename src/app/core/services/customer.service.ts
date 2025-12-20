import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Customer } from '../models/customer.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  // Recupera i clienti dal JSON Server
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_CONFIG.baseUrl}/customers`);
  }

  // Recupera un singolo cliente per ID
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_CONFIG.baseUrl}/customers/${id}`);
  }

  // Calcola il totale fatturato recuperando i dati dal server
  getTotalRevenue(): Observable<number> {
    return this.getCustomers().pipe(
      map((customers) =>
        customers.reduce((acc, curr) => acc + curr.revenue, 0)
      )
    );
  }

  // Aggiunge un nuovo cliente con ID incrementale
  addCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.getCustomers().pipe(
      map((customers) => {
        // Prende l'ultimo customer e incrementa il suo ID
        const lastCustomer = customers[customers.length - 1];
        const lastId = lastCustomer ? Number(lastCustomer.id) : 0;
        return String(lastId + 1);
      }),
      switchMap((newId) => {
        const newCustomerWithId = { ...customer, id: newId };
        // Nota: json-server potrebbe richiedere id come stringa o numero a seconda di come è stato inizializzato
        // Qui lo forziamo a stringa per coerenza con il db.json visto prima
        return this.http.post<Customer>(
          `${API_CONFIG.baseUrl}/customers`,
          newCustomerWithId
        );
      })
    );
  }

  // Elimina un cliente
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/customers/${id}`);
  }
}
