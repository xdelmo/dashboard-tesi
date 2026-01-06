export type ProductCategory = 'Cloud' | 'Analytics' | 'AI' | 'Consulenza';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  duration?: 'Mensile' | 'Annuale' | 'Una Tantum';
  status: 'Attivo' | 'Bozza' | 'Archiviato';
}
