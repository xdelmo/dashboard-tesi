import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../../../core/services/product.service';
import { Location } from '@angular/common';
import { of, combineLatest } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: false,
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private location = inject(Location);

  private refreshTrigger = signal(0);

  statusOptions: MenuItem[] = [
    { label: 'Attivo', command: () => this.updateStatus('Attivo') },
    { label: 'Bozza', command: () => this.updateStatus('Bozza') },
    { label: 'Disattivato', command: () => this.updateStatus('Disattivato') },
  ];

  product = toSignal(
    combineLatest([
      this.route.paramMap,
      toObservable(this.refreshTrigger),
    ]).pipe(
      switchMap(([params]) => {
        const id = params.get('id');
        return id ? this.productService.getProduct(id) : of(undefined);
      })
    )
  );

  updateStatus(status: string) {
    const currentProduct = this.product();
    if (currentProduct) {
      this.productService
        .updateProduct(currentProduct.id, { status: status as any })
        .subscribe(() => {
          this.refreshTrigger.update((n) => n + 1);
        });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
