import { Component, inject, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import {
  Product,
  ProductCategory,
  ProductStatus,
  ProductDuration,
} from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TextareaModule,
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent {
  isOpen = input(false);
  productToEdit = input<Product | null>(null);
  close = output<void>();
  save = output<Partial<Product>>();

  private fb = inject(FormBuilder);

  productForm = this.fb.group({
    id: [null as string | null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: [null as ProductCategory | null, Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    duration: [ProductDuration.Monthly, Validators.required],
    status: [ProductStatus.Active, Validators.required],
  });

  categoryOptions = [
    { label: 'Cloud', value: 'Cloud' },
    { label: 'Analytics', value: 'Analytics' },
    { label: 'AI', value: 'AI' },
    { label: 'Consulenza', value: 'Consulenza' },
  ];

  durationOptions = [
    { label: 'Mensile', value: ProductDuration.Monthly },
    { label: 'Annuale', value: ProductDuration.Yearly },
    { label: 'Una Tantum', value: ProductDuration.OneTime },
  ];

  statusOptions = [
    { label: 'Attivo', value: ProductStatus.Active },
    { label: 'Bozza', value: ProductStatus.Draft },
    { label: 'Disattivato', value: ProductStatus.Inactive },
  ];

  constructor() {
    effect(() => {
      const product = this.productToEdit();
      if (product) {
        this.productForm.patchValue({
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          duration: product.duration || ProductDuration.Monthly,
          status: product.status,
        });
      } else {
        this.productForm.reset({
          id: null,
          name: '',
          description: '',
          category: null,
          price: 0,
          duration: ProductDuration.Monthly,
          status: ProductStatus.Active,
        });
      }
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value as Partial<Product>);
    }
  }
}
