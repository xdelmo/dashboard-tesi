import { Product, ProductCategory } from './product.model';

export enum OrderStatus {
  Paid = 'Pagato',
  Pending = 'In Attesa',
  Failed = 'Fallito',
}

export interface Order {
  id: string;
  customerId: string;
  amount: number;
  date: string;
  status: OrderStatus;
  type: ProductCategory[];
  products?: Product[];
}
