export enum CustomerStatus {
  Active = 'Attivo',
  Pending = 'In Attesa',
  Inactive = 'Inattivo',
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;

  industry: string;
  plan?: 'Basic' | 'Professional' | 'Enterprise';
}
