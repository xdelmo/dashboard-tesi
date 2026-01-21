import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { API_CONFIG } from '../config/api.config';
import { CustomerService } from './customer.service';
import { ProductService } from './product.service';
import { ProductDuration } from '../models/product.model';
import { CustomerStatus } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private customerService = inject(CustomerService);
  private productService = inject(ProductService);

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

    return this.http.post<Order>(`${API_CONFIG.baseUrl}/orders`, newOrder).pipe(
      switchMap((createdOrder) => {
        if (!createdOrder.items || createdOrder.items.length === 0) {
          return of(createdOrder);
        }

        const productRequests = createdOrder.items.map((item) =>
          this.productService.getProduct(item.productId),
        );

        return forkJoin(productRequests).pipe(
          switchMap((products) => {
            const subscriptionProduct = products.find(
              (p) =>
                p.duration === ProductDuration.Monthly ||
                p.duration === ProductDuration.Yearly,
            );

            if (subscriptionProduct && createdOrder.customerId) {
              return this.customerService
                .getCustomer(createdOrder.customerId)
                .pipe(
                  switchMap((customer) => {
                    const now = new Date();
                    let newEndDate = new Date();

                    const orderItem = createdOrder.items?.find(
                      (i) => i.productId === subscriptionProduct.id,
                    );
                    const quantity = orderItem?.quantity || 1;

                    if (
                      subscriptionProduct.duration === ProductDuration.Yearly
                    ) {
                      newEndDate.setFullYear(now.getFullYear() + 1 * quantity);
                    } else {
                      newEndDate.setMonth(now.getMonth() + 1 * quantity);
                    }

                    const currentEndDateStr = customer.subscriptionEndDate;
                    let finalEndDate = newEndDate;

                    if (currentEndDateStr) {
                      const currentEndDate = new Date(currentEndDateStr);
                      if (currentEndDate > newEndDate) {
                        finalEndDate = currentEndDate;
                      }
                    }

                    const finalDateString = finalEndDate
                      .toISOString()
                      .split('T')[0];

                    return this.customerService
                      .updateCustomer(createdOrder.customerId, {
                        status: CustomerStatus.Active,
                        subscriptionEndDate: finalDateString,
                      })
                      .pipe(map(() => createdOrder));
                  }),
                );
            }

            return of(createdOrder);
          }),
        );
      }),
    );
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/orders/${id}`);
  }
}
