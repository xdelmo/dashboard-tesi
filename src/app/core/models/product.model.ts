export type ProductCategory = 'Cloud' | 'Analytics' | 'AI' | 'Consulting';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  duration?: 'Monthly' | 'Yearly' | 'One-Time';
  status: 'Active' | 'Draft' | 'Archived';
}
