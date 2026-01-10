import { Component, inject, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: false,
})
export class ProductListComponent {
  private productService = inject(ProductService);
  isModalOpen = false;
  private refreshTrigger = signal(0);

  products = toSignal(
    toObservable(this.refreshTrigger).pipe(
      switchMap(() => this.productService.getProducts())
    )
  );

  refreshData(): void {
    this.refreshTrigger.update((n) => n + 1);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveProduct(product: Partial<Product>): void {
    this.productService.addProduct(product).subscribe(() => {
      this.refreshData();
      this.closeModal();
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.refreshData();
    });
  }
}
