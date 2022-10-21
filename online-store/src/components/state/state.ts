import { AppState } from '../../interfaces/state';
import { Store } from './store';

const DEFAULT_STATE: AppState = {
  loading: false,
  cartProducts: [],
  favoriteProducts: [],
  sortingIndex: 0,
  filters: {
    search: '',
    brand: [],
    colour: [],
    camera: [],
    popular: false,
    price: {
      from: 0,
      to: 2000,
    },
    quantity: {
      from: 0,
      to: 20,
    },
    release: {
      from: 2018,
      to: 2022,
    },
  },
  products: [],
};

const state = new Store<AppState>(DEFAULT_STATE);

export default state;
