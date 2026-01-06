import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: false,
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product>;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private location = inject(Location);

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          return this.productService.getProduct(id);
        }
        return new Observable<Product>();
      })
    );
  }

  goBack(): void {
    this.location.back();
  }
}
