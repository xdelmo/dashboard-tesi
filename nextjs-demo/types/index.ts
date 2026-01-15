export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'Attivo' | 'In Attesa' | 'Inattivo';
  industry: string;
  plan: 'Basic' | 'Professional' | 'Enterprise';
}

export interface CustomerStats {
  id: string;
  customerId: string;
  totalRevenue: number;
  totalOrders: number;
  lastOrderDate: string;
}

export interface Order {
  id: string;
  customerId: string;
  date: string;
  status: 'Pagato' | 'In Attesa' | 'Annullato';
  total: number;
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
