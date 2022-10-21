import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import state from '../state/state';

class App {
  controller: AppController;
  view: AppView;
  storageFilters;
  storageSortIndex;
  storageCartProducts;
  storageFavoriteProducts;

  constructor() {
    this.controller = new AppController();
    if (localStorage.getItem('filters')) {
      this.storageFilters = JSON.parse(localStorage.getItem('filters') as string);
      state.set({ filters: this.storageFilters });
    }
    if (localStorage.getItem('sortingIndex')) {
      this.storageSortIndex = JSON.parse(localStorage.getItem('sortingIndex') as string);
      state.set({ sortingIndex: this.storageSortIndex });
    }
    if (localStorage.getItem('cartProducts')) {
      this.storageCartProducts = JSON.parse(localStorage.getItem('cartProducts') as string);
      state.set({ cartProducts: this.storageCartProducts });
    }
    if (localStorage.getItem('favoriteProducts')) {
      this.storageFavoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts') as string);
      state.set({ favoriteProducts: this.storageFavoriteProducts });
    }
    state.select('favoriteProducts').subscribe(() => this.getData());
    state.select('cartProducts').subscribe(() => this.getData());
    state.select('sortingIndex').subscribe(() => this.getData());
    state.select('filters').subscribe(() => this.getData());
    this.view = new AppView({ selector: '#root' });
  }

  getData() {
    const stateFilters = state.get('filters');
    const stateSortIndex = state.get('sortingIndex');
    const stateCartProducts = state.get('cartProducts');
    const stateFavoriteProducts = state.get('favoriteProducts');
    localStorage.setItem('filters', JSON.stringify({ ...stateFilters, search: '' }));
    localStorage.setItem('sortingIndex', JSON.stringify(stateSortIndex));
    localStorage.setItem('cartProducts', JSON.stringify(stateCartProducts));
    localStorage.setItem('favoriteProducts', JSON.stringify(stateFavoriteProducts));
    this.controller.getProducts(stateFilters, stateSortIndex);
  }
}

export default App;
