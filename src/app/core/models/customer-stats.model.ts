export interface CustomerStats {
  id: string;
  customerId: string;
  totalRevenue: number;
  lastOrderDate?: string;
  totalOrders: number;
}
