import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Customer } from '../models/customer.model';
import { API_CONFIG } from '../config/api.config';
import { IdGenerator } from '../../shared/utils/id-generator.util';
import { MessageService } from 'primeng/api';
import { notifySuccess } from '../../shared/utils/notification.operator';
import { CustomerStatsService } from './customer-stats.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private customerStatsService = inject(CustomerStatsService);

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
    return this.customerStatsService
      .getAllStats()
      .pipe(
        map((stats) => stats.reduce((acc, curr) => acc + curr.totalRevenue, 0))
      );
  }

  // Aggiunge un nuovo cliente con ID random
  addCustomer(customer: Partial<Customer>): Observable<Customer> {
    const newId = IdGenerator.generate();
    const newCustomerWithId = { ...customer, id: newId };

    return this.http
      .post<Customer>(`${API_CONFIG.baseUrl}/customers`, newCustomerWithId)
      .pipe(
        notifySuccess(this.messageService, 'Cliente aggiunto correttamente')
      );
  }

  // Elimina un cliente
  deleteCustomer(id: string): Observable<void> {
    return this.http
      .delete<void>(`${API_CONFIG.baseUrl}/customers/${id}`)
      .pipe(
        notifySuccess(this.messageService, 'Cliente eliminato correttamente')
      );
  }

  // Aggiorna un cliente esistente
  updateCustomer(
    id: string,
    customer: Partial<Customer>
  ): Observable<Customer> {
    return this.http
      .patch<Customer>(`${API_CONFIG.baseUrl}/customers/${id}`, customer)
      .pipe(
        notifySuccess(this.messageService, 'Cliente aggiornato correttamente')
      );
  }
}
