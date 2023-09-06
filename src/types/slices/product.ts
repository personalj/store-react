import { Product } from '../product.ts';

export interface ProductState {
  loading: boolean;
  error: string;
  products: Product[];
  product: null | Product;
}
