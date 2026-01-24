import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { CustomerStats } from '../models/customer-stats.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerStatsService {
  private http = inject(HttpClient);
  private apiUrl = `${API_CONFIG.baseUrl}/customerStats`;

  getStatsByCustomerId(customerId: string): Observable<CustomerStats[]> {
    return this.http.get<CustomerStats[]>(
      `${this.apiUrl}?customerId=${customerId}`,
    );
  }

  getAllStats(): Observable<CustomerStats[]> {
    return this.http.get<CustomerStats[]>(this.apiUrl);
  }

  createStats(stats: CustomerStats): Observable<CustomerStats> {
    return this.http.post<CustomerStats>(this.apiUrl, stats);
  }

  updateStats(stats: CustomerStats): Observable<CustomerStats> {
    return this.http.patch<CustomerStats>(`${this.apiUrl}/${stats.id}`, stats);
  }
}
