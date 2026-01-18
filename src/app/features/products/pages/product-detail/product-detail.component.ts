import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../../../core/services/product.service';
import { Location } from '@angular/common';
import { of, combineLatest } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusTagComponent } from '../../../../shared/components/status-tag/status-tag.component';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PageHeaderComponent,
    StatusTagComponent,
    ProductModalComponent,
  ],
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private location = inject(Location);

  private refreshTrigger = signal(0);
  isModalOpen = false;

  product = toSignal(
    combineLatest([
      this.route.paramMap,
      toObservable(this.refreshTrigger),
    ]).pipe(
      switchMap(([params]) => {
        const id = params.get('id');
        return id ? this.productService.getProduct(id) : of(undefined);
      }),
    ),
  );

  openEditModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveProduct(product: Partial<any>) {
    const currentProduct = this.product();
    if (currentProduct) {
      this.productService
        .updateProduct(currentProduct.id, product)
        .subscribe(() => {
          this.refreshTrigger.update((n) => n + 1);
          this.closeModal();
        });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
