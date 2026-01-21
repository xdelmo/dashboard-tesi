import { Component, Input, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Product,
  ProductDuration,
} from '../../../../core/models/product.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subscription-expiration-preview',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    @if (expirationDate()) {
      <div class="flex justify-end mt-1">
        <small
          class="text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded"
        >
          <i class="pi pi-calendar mr-1 text-xs"></i>
          Scadenza prevista: {{ expirationDate() | date: 'dd/MM/yyyy' }}
        </small>
      </div>
    }
  `,
})
export class SubscriptionExpirationPreviewComponent {
  product = input.required<Product>();
  quantity = input.required<number>();

  expirationDate = computed(() => {
    const prod = this.product();
    const qty = this.quantity();

    if (
      prod.duration !== ProductDuration.Monthly &&
      prod.duration !== ProductDuration.Yearly
    ) {
      return null;
    }

    const date = new Date();

    const multiplier = qty || 1;

    if (prod.duration === ProductDuration.Monthly) {
      date.setMonth(date.getMonth() + multiplier);
    } else if (prod.duration === ProductDuration.Yearly) {
      date.setFullYear(date.getFullYear() + multiplier);
    }

    return date;
  });
}
