import { Component, input, output, effect, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Customer,
  CustomerStatus,
} from '../../../../core/models/customer.model';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
  standalone: false,
})
export class CustomerModalComponent {
  isOpen = input(false);
  customerToEdit = input<Customer | null>(null);
  close = output<void>();
  save = output<Partial<Customer>>();

  private fb = inject(FormBuilder);

  // Form con Validatori
  customerForm = this.fb.group({
    id: [null as string | null],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: ['', Validators.required],
    status: [CustomerStatus.Active, Validators.required],
    revenue: [0, [Validators.required, Validators.min(0)]],
  });

  // Options per componente Select
  statusOptions = [
    { label: 'Attivo', value: CustomerStatus.Active },
    { label: 'In Attesa', value: CustomerStatus.Pending },
    { label: 'Inattivo', value: CustomerStatus.Inactive },
  ];

  constructor() {
    // EFFETTO REATTIVO:
    // Questo blocco viene eseguito automaticamente ogni volta che il segnale 'customerToEdit' cambia.
    // Se viene passato un cliente (modalità modifica), pre-compila il form.
    // Se è null (modalità creazione), resetta il form.
    //
    effect(() => {
      const customer = this.customerToEdit();
      if (customer) {
        this.customerForm.patchValue(customer);
      } else {
        this.customerForm.reset({
          status: CustomerStatus.Active,
          revenue: 0,
        });
      }
    });
  }

  onClose(): void {
    this.customerForm.reset();
    this.close.emit();
  }

  onSave(): void {
    if (this.customerForm.valid) {
      this.save.emit(this.customerForm.value as Partial<Customer>);
      // Non resettiamo subito, lasciamo che sia il padre a chiudere
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
