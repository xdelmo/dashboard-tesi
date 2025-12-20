import { Component, input, output, effect } from '@angular/core';
import { Customer, CustomerStatus } from '../../../../core/models/customer.model';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
  standalone: false,
})
export class CustomerModalComponent {
  isOpen = input(false);
  customerToEdit = input<Customer | null>(null); // Input per il cliente da modificare
  close = output<void>();
  save = output<Partial<Customer>>();

  // Esponiamo l'enum al template
  public CustomerStatus = CustomerStatus;

  newCustomer: Partial<Customer> = {
    name: '',
    email: '',
    company: '',
    status: CustomerStatus.Active,
    revenue: 0,
  };

  constructor() {
    // EFFETTO REATTIVO:
    // Questo blocco viene eseguito automaticamente ogni volta che il segnale 'customerToEdit' cambia.
    // Se viene passato un cliente (modalità modifica), pre-compila il form.
    // Se è null (modalità creazione), resetta il form.
    effect(() => {
      const customer = this.customerToEdit();
      if (customer) {
        this.newCustomer = { ...customer };
      } else {
        this.resetForm();
      }
    });
  }

  onClose(): void {
    this.resetForm();
    this.close.emit();
  }

  onSave(): void {
    if (this.newCustomer.name && this.newCustomer.email) {
      this.save.emit({ ...this.newCustomer });
      // Non resettiamo subito, lasciamo che sia il padre a chiudere
    }
  }

  private resetForm(): void {
    this.newCustomer = {
      name: '',
      email: '',
      company: '',
      status: CustomerStatus.Active,
      revenue: 0,
    };
  }
}



