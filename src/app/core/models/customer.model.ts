export interface Customer {
  id: number;
  name: string;
  email: string;
  company: string;
  status: 'Active' | 'Pending' | 'Inactive';
  revenue: number;
}
