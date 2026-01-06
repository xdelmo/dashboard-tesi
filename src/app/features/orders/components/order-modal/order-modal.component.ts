import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../../core/services/customer.service';
import { ProductService } from '../../../../core/services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Order } from '../../../../core/models/order.model';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  standalone: false,
})
export class OrderModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Order>>();

  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private productService = inject(ProductService);

  customers$ = this.customerService.getCustomers();
  products$ = this.productService.getProducts();

  orderForm!: FormGroup;

  orderStatuses = [
    { label: 'Pagato', value: 'Pagato' },
    { label: 'In Attesa', value: 'In Attesa' },
    { label: 'Fallito', value: 'Fallito' },
  ];

  ngOnInit() {
    this.initForm();
    this.setupAmountCalculation();
  }

  initForm() {
    this.orderForm = this.fb.group({
      customerId: ['', Validators.required],
      date: [new Date(), Validators.required],
      amount: [
        { value: 0, disabled: true },
        [Validators.required, Validators.min(0)],
      ],
      status: ['In Attesa', Validators.required],
      products: [[], Validators.required], // Products selection
      type: ['Abbonamento'], // Default or calculated
    });
  }

  setupAmountCalculation() {
    this.orderForm
      .get('products')
      ?.valueChanges.subscribe((selectedProducts: Product[]) => {
        const total = selectedProducts.reduce(
          (sum, product) => sum + product.price,
          0
        );
        this.orderForm.patchValue({ amount: total });

        if (selectedProducts.length > 0) {
        }
      });
  }

  onSave() {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.getRawValue();

      this.save.emit(formValue);
      this.orderForm.reset({
        date: new Date(),
        amount: 0,
        status: 'In Attesa',
        type: 'Abbonamento',
        products: [],
      });
    }
  }

  onCancel() {
    this.close.emit();
  }
}
