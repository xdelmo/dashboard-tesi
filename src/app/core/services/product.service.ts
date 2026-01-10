import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductStatus } from '../models/product.model';
import { API_CONFIG } from '../config/api.config';
import { notifySuccess } from '../../shared/utils/notification.operator';
import { MessageService } from 'primeng/api';
import { IdGenerator } from '../../shared/utils/id-generator.util';

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

  addProduct(product: Partial<Product>): Observable<Product> {
    const newId = IdGenerator.generate();
    const newProductWithId = { ...product, id: newId };
    return this.http
      .post<Product>(`${API_CONFIG.baseUrl}/products`, newProductWithId)
      .pipe(
        notifySuccess(this.messageService, 'Prodotto aggiornato correttamente')
      );
  }
  // Soft delete: imposta lo stato a Inactive
  deleteProduct(id: string): Observable<Product> {
    return this.http
      .patch<Product>(`${API_CONFIG.baseUrl}/products/${id}`, {
        status: ProductStatus.Inactive,
      })
      .pipe(
        notifySuccess(this.messageService, 'Prodotto disattivato correttamente')
      );
  }
}
