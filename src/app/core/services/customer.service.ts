import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Customer } from '../models/customer.model';
import { API_CONFIG } from '../config/api.config';
import { IdGenerator } from '../../shared/utils/id-generator.util';

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
  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${API_CONFIG.baseUrl}/customers/${id}`);
  }

  // Calcola il totale fatturato recuperando i dati dal server
  getTotalRevenue(): Observable<number> {
    return this.getCustomers().pipe(
      map((customers) => customers.reduce((acc, curr) => acc + curr.revenue, 0))
    );
  }

  // Aggiunge un nuovo cliente con ID random
  addCustomer(customer: Partial<Customer>): Observable<Customer> {
    const newId = IdGenerator.generate();
    const newCustomerWithId = { ...customer, id: newId };

    return this.http.post<Customer>(
      `${API_CONFIG.baseUrl}/customers`,
      newCustomerWithId
    );
  }

  // Elimina un cliente
  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/customers/${id}`);
  }

  // Aggiorna un cliente esistente
  updateCustomer(
    id: string,
    customer: Partial<Customer>
  ): Observable<Customer> {
    return this.http.put<Customer>(
      `${API_CONFIG.baseUrl}/customers/${id}`,
      customer
    );
  }
}
