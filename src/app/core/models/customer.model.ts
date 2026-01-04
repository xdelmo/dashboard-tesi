export enum CustomerStatus {
  Active = 'Active',
  Pending = 'Pending',
  Inactive = 'Inactive',
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;
  revenue: number;
  industry?: string;
  plan?: 'Basic' | 'Professional' | 'Enterprise';
}
