export interface Order {
  id: string;
  customerId: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Failed';
  type: 'Subscription' | 'Professional Services';
}
