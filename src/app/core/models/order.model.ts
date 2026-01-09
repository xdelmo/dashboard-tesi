import { Product, ProductCategory } from './product.model';

export enum OrderStatus {
  Paid = 'Pagato',
  Pending = 'In Attesa',
  Failed = 'Fallito',
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category: ProductCategory;
}

export interface Order {
  id: string;
  customerId: string;
  date: string;
  status: OrderStatus;

  subtotal: number;
  tax: number;
  discountAmount: number;
  total: number;

  type: string;
  items: OrderItem[];

  products?: Product[];
}
