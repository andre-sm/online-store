import { Product } from './product';
import { Filters } from './filters';

export interface AppState {
  loading: boolean;
  cartProducts: number[];
  favoriteProducts: number[];
  sortingIndex: number;
  filters: Filters;
  products: Product[];
}
