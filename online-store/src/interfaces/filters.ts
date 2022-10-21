import { PriceRange } from './price-range';
import { QuantityRange } from './quantity-range';
import { ReleaseRange } from './release-range';

export interface Filters {
  search: string;
  brand: string[];
  colour: string[];
  camera: string[];
  popular: boolean;
  price: PriceRange;
  quantity: QuantityRange;
  release: ReleaseRange;
}
