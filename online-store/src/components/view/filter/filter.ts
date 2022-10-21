import ElementBuilder from '../element-builder';
import Brand from './brand-filter';
import Price from './price-filter';
import Colour from './colour-filter';
import Quantity from './quantity';
import Camera from './camera';
import Release from './release';
import Popular from './popular';
import state from '../../state/state';
import { DEFAULT_FILTERS } from '../../../constants/default-filters';

class Filter extends ElementBuilder {
  brand: Brand | undefined;
  price: Price | undefined;
  colour: Colour | undefined;
  quantity: Quantity | undefined;
  camera: Camera | undefined;
  popular: Popular | undefined;
  release: Release | undefined;

  initialize() {
    this.render();
    this.brand = new Brand({ selector: '#brand-filter' });
    this.price = new Price({ selector: '#price-filter' });
    this.colour = new Colour({ selector: '#colour-filter' });
    this.quantity = new Quantity({ selector: '#quantity-filter' });
    this.popular = new Popular({ selector: '#popular-filter' });
    this.camera = new Camera({ selector: '#camera-filter' });
    this.release = new Release({ selector: '#release-filter' });
  }

  render() {
    this.element.innerHTML = `
      <section id="brand-filter" class="filter-section"></section>
      <section id="price-filter" class="filter-section"></section>
      <section id="colour-filter" class="filter-section"></section>
      <section id="quantity-filter" class="filter-section"></section>
      <section id="popular-filter" class="filter-section"></section>
      <section id="camera-filter" class="filter-section"></section>
      <section id="release-filter" class="filter-section"></section>
      <button class="btn filter-btn">Reset</button>
    `;

    const filterBtn = this.element.querySelector('.filter-btn') as HTMLButtonElement;
    filterBtn.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const filters = state.get('filters');
      state.set({
        filters: {
          ...filters,
          price: { from: DEFAULT_FILTERS.price.from, to: DEFAULT_FILTERS.price.to },
          brand: DEFAULT_FILTERS.brand,
          colour: DEFAULT_FILTERS.colour,
          camera: DEFAULT_FILTERS.camera,
          popular: DEFAULT_FILTERS.popular,
          quantity: { from: DEFAULT_FILTERS.quantity.from, to: DEFAULT_FILTERS.quantity.to },
          release: { from: DEFAULT_FILTERS.release.from, to: DEFAULT_FILTERS.release.to },
        },
      });
      this.initialize();
    });
  }
}

export default Filter;
