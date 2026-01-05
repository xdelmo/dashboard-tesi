import {
  Component,
  input,
  output,
  effect,
  inject,
  computed,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Customer,
  CustomerStatus,
} from '../../../../core/models/customer.model';
import { AuthService } from '../../../../core/services/auth.service';

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
  private authService = inject(AuthService);

  isAdmin = computed(() => this.authService.isAdmin());

  // Form con Validatori
  customerForm = this.fb.group({
    id: [null as string | null],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: ['', Validators.required],
    industry: ['', Validators.required],
    status: [CustomerStatus.Active, Validators.required],
  });

  // Options per componente Select
  statusOptions = [
    { label: 'Attivo', value: CustomerStatus.Active },
    { label: 'In Attesa', value: CustomerStatus.Pending },
    { label: 'Inattivo', value: CustomerStatus.Inactive },
  ];

  industryOptions = [
    { label: 'Software & IT', value: 'Software' },
    { label: 'Servizi Professionali', value: 'Professional Services' },
    { label: 'Creatività & Design', value: 'Creative' },
    { label: 'Retail & E-commerce', value: 'Retail' },
    { label: 'Logistica & Trasporti', value: 'Logistics' },
    { label: 'Cybersecurity', value: 'Cybersecurity' },
    { label: 'Altro', value: 'Other' },
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
          status: CustomerStatus.Inactive,
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
      let formValue = this.customerForm.value as Partial<Customer>;

      if (!this.customerToEdit()) {
        formValue = { ...formValue, revenue: 0 };
      }

      this.save.emit(formValue);
      // Non resettiamo subito, lasciamo che sia il padre a chiudere
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
