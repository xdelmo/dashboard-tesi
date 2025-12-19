export enum CustomerStatus {
  Active = 'Active',
  Pending = 'Pending',
  Inactive = 'Inactive',
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;
  revenue: number;
}
