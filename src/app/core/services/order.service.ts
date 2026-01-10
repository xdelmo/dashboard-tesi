import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_CONFIG.baseUrl}/orders`);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${API_CONFIG.baseUrl}/orders/${id}`);
  }

  addOrder(order: Partial<Order>): Observable<Order> {
    const newOrder = {
      ...order,
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
    };
    return this.http.post<Order>(`${API_CONFIG.baseUrl}/orders`, newOrder);
  }
  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/orders/${id}`);
  }
}
