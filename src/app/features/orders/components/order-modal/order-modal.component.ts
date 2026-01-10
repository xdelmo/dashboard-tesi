import { Component, inject, input, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomerService } from '../../../../core/services/customer.service';
import { ProductService } from '../../../../core/services/product.service';
import { Order, OrderStatus } from '../../../../core/models/order.model';
import { Product, ProductStatus } from '../../../../core/models/product.model';

import { map, combineLatest, startWith } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelect } from 'primeng/multiselect';
import { Button } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { CustomerStatus } from '../../../../core/models/customer.model';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    Select,
    DatePicker,
    InputNumberModule,
    MultiSelect,
    Button,
    FormsModule,
    ReactiveFormsModule,
    CurrencyPipe,
  ],
})
export class OrderModalComponent {
  isOpen = input<boolean>(false);
  close = output<void>();
  save = output<Partial<Order>>();

  // Explicit getter to resolve template type checking issue with SignalInput
  get dialogVisible(): boolean {
    return this.isOpen();
  }

  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private productService = inject(ProductService);

  customers = toSignal(
    this.customerService
      .getCustomers()
      .pipe(map((c) => c.filter((c) => c.status === CustomerStatus.Active))),
    {
      initialValue: [],
    }
  );

  products = toSignal(
    this.productService
      .getProducts()
      .pipe(
        map((products) =>
          products.filter((p) => p.status === ProductStatus.Active)
        )
      ),
    { initialValue: [] }
  );

  orderForm: FormGroup = this.fb.group({
    customerId: ['', Validators.required],
    date: [new Date(), Validators.required],
    amount: [
      { value: 0, disabled: true },
      [Validators.required, Validators.min(0)],
    ],
    status: [OrderStatus.Pending, Validators.required],
    products: [[], Validators.required],
    type: ['Abbonamento'],
  });

  orderStatuses = [
    { label: OrderStatus.Paid, value: OrderStatus.Paid },
    { label: OrderStatus.Pending, value: OrderStatus.Pending },
    { label: OrderStatus.Failed, value: OrderStatus.Failed },
  ];

  quantities: { [productId: string]: number } = {};

  constructor() {
    this.setupAmountCalculation();
  }

  discountDetails = {
    originalAmount: 0,
    discountPercentage: 0,
    discountAmount: 0,
    finalAmount: 0,
    plan: '',
  };

  calculatedFinancials = {
    subtotal: 0,
    tax: 0,
    discountAmount: 0,
    total: 0,
  };

  get selectedProducts(): Product[] {
    return (this.orderForm.get('products')?.value as Product[]) || [];
  }

  setupAmountCalculation() {
    combineLatest([
      this.orderForm.get('products')?.valueChanges.pipe(startWith([])) || [],
      this.orderForm.get('customerId')?.valueChanges.pipe(startWith('')) || [],
    ]).subscribe(([selectedProducts, customerId]: [any, any]) => {
      // safe casting inside
      const products = (selectedProducts as Product[]) || [];
      const custId = customerId as string;
      const custs = this.customers();

      const subtotal = products.reduce(
        (sum, product) =>
          sum + product.price * (this.quantities[product.id] || 1),
        0
      );

      this.discountDetails.originalAmount = subtotal;
      this.discountDetails.discountPercentage = 0;
      this.discountDetails.discountAmount = 0;
      this.discountDetails.plan = '';

      if (custId && custs) {
        const customer = custs.find((c: any) => c.id === custId);
        if (customer && customer.plan) {
          this.discountDetails.plan = customer.plan;
          switch (customer.plan) {
            case 'Professional':
              this.discountDetails.discountPercentage = 10;
              break;
            case 'Enterprise':
              this.discountDetails.discountPercentage = 20;
              break;
            default:
              this.discountDetails.discountPercentage = 0;
          }

          if (this.discountDetails.discountPercentage > 0) {
            this.discountDetails.discountAmount =
              subtotal * (this.discountDetails.discountPercentage / 100);
          }
        }
      }

      this.updateFinancials(subtotal, custId, custs);
    });
  }

  updateFinancials(subtotal: number, custId: string, custs: any[]) {
    const discountedSubtotal = subtotal - this.discountDetails.discountAmount;
    const tax = discountedSubtotal * 0.11;
    const total = discountedSubtotal + tax;

    this.discountDetails.finalAmount = total;

    // Store calculated values in the component to access them in onSave
    this.calculatedFinancials = {
      subtotal,
      tax,
      discountAmount: this.discountDetails.discountAmount,
      total,
    };

    this.orderForm.patchValue({ amount: total }, { emitEvent: false });
  }

  updateQuantity(productId: string, quantity: number) {
    this.quantities[productId] = quantity;
    // Trigger recalculation by explicitly updating the form control validity
    // which triggers the valueChanges subscription in setupAmountCalculation
    this.orderForm.get('products')?.updateValueAndValidity({ emitEvent: true });
  }

  onSave() {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.getRawValue();
      const selectedProducts = formValue.products as Product[];

      const order: Partial<Order> = {
        customerId: formValue.customerId,
        date: formValue.date,
        status: formValue.status,
        type: formValue.type,

        subtotal: this.calculatedFinancials.subtotal,
        tax: this.calculatedFinancials.tax,
        discountAmount: this.calculatedFinancials.discountAmount,
        total: this.calculatedFinancials.total,

        items: selectedProducts.map((p) => ({
          productId: p.id,
          name: p.name,
          price: p.price,
          quantity: this.quantities[p.id] || 1,
          category: p.category,
        })),
      };

      this.save.emit(order);
      this.resetForm();
    }
  }

  onCancel() {
    this.resetForm();
    this.close.emit();
  }

  private resetForm() {
    this.orderForm.reset({
      date: new Date(),
      amount: 0,
      status: OrderStatus.Pending,
      type: 'Abbonamento',
      products: [],
    });
    this.quantities = {};
    this.calculatedFinancials = {
      subtotal: 0,
      tax: 0,
      discountAmount: 0,
      total: 0,
    };
    this.discountDetails = {
      originalAmount: 0,
      discountPercentage: 0,
      discountAmount: 0,
      finalAmount: 0,
      plan: '',
    };
  }
}
