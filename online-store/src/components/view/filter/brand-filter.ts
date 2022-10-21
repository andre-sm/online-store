import ElementBuilder from '../element-builder';
import state from '../../state/state';
import { Filters } from '../../../interfaces/filters';

class Brand extends ElementBuilder {
  filters: Filters | undefined;
  initialize() {
    this.filters = state.get('filters');
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <h3 class="filter-section__title">Brand</h3>
      <div class="filter-section__body checkbox-filter">
        <label for="asus" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input brand-checkbox" ${
            this.filters?.brand.includes('asus') ? 'checked' : ''
          } id="asus" name="brands">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Asus</span>
        </label>
        <label for="sony" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input brand-checkbox" ${
            this.filters?.brand.includes('sony') ? 'checked' : ''
          } id="sony" name="brands">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Sony</span>
        </label>
        <label for="samsung" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input brand-checkbox" ${
            this.filters?.brand.includes('samsung') ? 'checked' : ''
          } id="samsung" name="brands">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Samsung</span>
        </label>
        <label for="apple" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input brand-checkbox" ${
            this.filters?.brand.includes('apple') ? 'checked' : ''
          } id="apple" value="apple" name="brands">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Apple</span>
        </label>
        <label for="xiaomi" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input brand-checkbox" ${
            this.filters?.brand.includes('xiaomi') ? 'checked' : ''
          } id="xiaomi" name="brands">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Xiaomi</span>
        </label>
        <label for="nokia" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input brand-checkbox" ${
            this.filters?.brand.includes('nokia') ? 'checked' : ''
          } id="nokia" name="brands">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Nokia</span>
        </label>
        <label for="huawei" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input brand-checkbox" ${
            this.filters?.brand.includes('huawei') ? 'checked' : ''
          } id="huawei" name="brands">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Huawei</span>
        </label>
        <label for="nothing" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input brand-checkbox" ${
            this.filters?.brand.includes('nothing') ? 'checked' : ''
          } id="nothing" name="brands">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Nothing</span>
        </label>
      </div>
    `;

    const productContainer = this.element.querySelectorAll('.brand-checkbox') as NodeListOf<Element>;
    productContainer.forEach((item) => item.addEventListener('click', this.filterChange));
  }

  filterChange() {
    const collection = document.querySelectorAll('input[name="brands"]:checked');
    const selectedBrands: string[] = [];
    collection.forEach((node) => selectedBrands.push(node.id));
    const filters = state.get('filters');
    const newFilterState = { filters: { ...filters, brand: selectedBrands } };
    state.set(newFilterState);
  }
}

export default Brand;
