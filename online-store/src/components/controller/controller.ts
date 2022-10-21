import { Product } from '../../interfaces/product';
import { PriceRange } from '../../interfaces/price-range';
import { QuantityRange } from '../../interfaces/quantity-range';
import { ReleaseRange } from '../../interfaces/release-range';
import { productsData } from '../../data/products';
import state from '../state/state';
import { Filters } from '../../interfaces/filters';

class AppController {
  productsData: Product[];
  constructor() {
    this.productsData = productsData;
  }
  getProducts(stateFilters: Filters, stateSortIndex: number) {
    state.set({ loading: true });
    const promise: Promise<Product[]> = new Promise((resolve) => {
      setTimeout(() => {
        state.set({ loading: false });
        resolve(this.processProducts(stateFilters, stateSortIndex));
      }, 300);
    });
    promise.then((products) => {
      state.set({ products: products });
    });
  }

  private processProducts(stateFilters: Filters, stateSortIndex: number): Product[] {
    const filteredProducts = this.filterData(this.productsData, stateFilters) as Product[];
    const sortedProducts = this.sortData(filteredProducts, stateSortIndex) as Product[];
    return sortedProducts;
  }

  filterData(products: Product[], stateFilters: Filters) {
    return products.filter(
      (product) =>
        this.searchFilter(product, stateFilters.search) &&
        this.colourFilter(product, stateFilters.colour) &&
        this.brandFilter(product, stateFilters.brand) &&
        this.popularFilter(product, stateFilters.popular) &&
        this.cameraFilter(product, stateFilters.camera) &&
        this.priceFilter(product, stateFilters.price) &&
        this.quantityFilter(product, stateFilters.quantity) &&
        this.releaseFilter(product, stateFilters.release)
    );
  }

  searchFilter(product: Product, value: string) {
    if (value === '') return product;
    const searchTarget = `${product.brand} ${product.model}`.toLowerCase();
    return searchTarget.includes(value);
  }

  colourFilter(product: Product, colour: string[]) {
    if (colour.length === 0) return product;
    return colour.includes(product.colour.toLowerCase());
  }

  brandFilter(product: Product, brands: string[]) {
    if (brands.length === 0) return product;
    return brands.includes(product.brand.toLowerCase());
  }

  popularFilter(product: Product, popular: boolean) {
    if (popular) return product.popular === true;
    return product;
  }

  cameraFilter(product: Product, camera: string[]) {
    if (camera.length === 0) return product;
    return camera.includes(product.camera.toLowerCase());
  }

  priceFilter(product: Product, priceRange: PriceRange) {
    return product.price >= priceRange.from && product.price <= priceRange.to;
  }

  quantityFilter(product: Product, quantityRange: QuantityRange) {
    return product.quantity >= quantityRange.from && product.quantity <= quantityRange.to;
  }

  releaseFilter(product: Product, releaseRange: ReleaseRange) {
    return product.release >= releaseRange.from && product.release <= releaseRange.to;
  }

  sortData(products: Product[], stateSortIndex: number) {
    switch (stateSortIndex) {
      case 0:
        return products.sort((a, b) => a.price - b.price);
      case 1:
        return products.sort((a, b) => b.price - a.price);
      case 2:
        return products.sort((a, b) => a.brand.localeCompare(b.brand));
      case 3:
        return products.sort((a, b) => b.brand.localeCompare(a.brand));
      case 4:
        return products.sort((a, b) => a.release - b.release);
      case 5:
        return products.sort((a, b) => b.release - a.release);
    }
  }
}

export default AppController;
