import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { API_CONFIG } from '../config/api.config';
import { notifySuccess } from '../../shared/utils/notification.operator';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_CONFIG.baseUrl}/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${API_CONFIG.baseUrl}/products/${id}`);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http
      .patch<Product>(`${API_CONFIG.baseUrl}/products/${id}`, product)
      .pipe(
        notifySuccess(this.messageService, 'Prodotto aggiornato correttamente')
      );
  }
}
