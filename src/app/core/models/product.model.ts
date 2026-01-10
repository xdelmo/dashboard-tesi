export type ProductCategory = 'Cloud' | 'Analytics' | 'AI' | 'Consulenza';

export enum ProductStatus {
  Active = 'Attivo',
  Draft = 'Bozza',
  Inactive = 'Disattivato',
}

export enum ProductDuration {
  Monthly = 'Mensile',
  Yearly = 'Annuale',
  OneTime = 'Una Tantum',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  duration: ProductDuration;
  status: ProductStatus;
}
