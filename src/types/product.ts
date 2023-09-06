import { Rating } from './rating.ts';
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: Rating;
  quantity: number;
}
