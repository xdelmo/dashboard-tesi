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
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TooltipModule,
  ],
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
    status: [
      { value: CustomerStatus.Pending, disabled: true },
      Validators.required,
    ],
    plan: ['Basic', Validators.required],
  });

  planOptions = [
    { label: 'Basic', value: 'Basic' },
    { label: 'Professional', value: 'Professional' },
    { label: 'Enterprise', value: 'Enterprise' },
  ];

  // Options per componente Select
  statusOptions = [
    { label: 'Attivo', value: CustomerStatus.Active },
    { label: 'In Attesa', value: CustomerStatus.Pending },
    { label: 'Inattivo', value: CustomerStatus.Inactive },
    { label: 'Scaduto', value: CustomerStatus.Expired },
    { label: 'Sospeso', value: CustomerStatus.Suspended },
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
          plan: 'Basic',
        });
      }

      // read-only
      // this.customerForm.get('status')?.disable(); // Init set to disabled

      if (!this.isAdmin()) {
        this.customerForm.get('plan')?.disable();
      } else {
        this.customerForm.get('plan')?.enable();
      }
    });
  }

  onClose(): void {
    this.customerForm.reset();
    this.close.emit();
  }

  onSave(): void {
    if (this.customerForm.valid) {
      // Use getRawValue() to include disabled fields (like status)
      let formValue = this.customerForm.getRawValue() as Partial<Customer>;

      if (!this.customerToEdit()) {
        formValue = { ...formValue };
      }

      this.save.emit(formValue);
      // Non resettiamo subito, lasciamo che sia il padre a chiudere
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
