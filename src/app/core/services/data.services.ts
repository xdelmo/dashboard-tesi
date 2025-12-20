import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RevenueStats } from '../models/chart.model';


import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {}

  // Recupera i dati del grafico fatturato
  getRevenueStats(): Observable<RevenueStats> {
    return this.http.get<RevenueStats>(`${API_CONFIG.baseUrl}/revenueStats`);
  }
}


