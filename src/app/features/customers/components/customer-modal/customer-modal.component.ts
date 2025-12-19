import { Component, input, output } from '@angular/core';
import { Customer, CustomerStatus } from '../../../../core/models/customer.model';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
  standalone: false,
})
export class CustomerModalComponent {
  isOpen = input(false);
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

  onClose(): void {
    this.resetForm();
    this.close.emit();
  }

  onSave(): void {
    if (this.newCustomer.name && this.newCustomer.email) {
      this.save.emit({ ...this.newCustomer });
      this.resetForm();
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


