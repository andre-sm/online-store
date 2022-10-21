import ElementBuilder from '../element-builder';
import state from '../../state/state';
import { Filters } from '../../../interfaces/filters';

class Colour extends ElementBuilder {
  filters: Filters | undefined;
  initialize() {
    this.filters = state.get('filters');
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <h3 class="filter-section__title">Popular</h3>
      <div class="filter-section__body toggle-section">
        <div class="filter-section__toggle">
          <input id="toggle-on" class="toggle-input toggle-left" name="toggle" value="true" type="radio" ${
            this.filters?.popular ? 'checked' : ''
          }>
          <label for="toggle-on" class="toggle-btn">Yes</label>
          <input id="toggle-off" class="toggle-input toggle-right" name="toggle" value="false" type="radio" ${
            this.filters?.popular ? '' : 'checked'
          }>
          <label for="toggle-off" class="toggle-btn">No</label>
        </div> 
      </div>
    `;
    const productContainer = this.element.querySelectorAll('.toggle-input') as NodeListOf<Element>;
    productContainer.forEach((item) => item.addEventListener('click', this.filterChange));
  }

  filterChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const filters = state.get('filters');
    const isTrue = target.id === 'toggle-on';
    const newFilterState = { filters: { ...filters, popular: isTrue } };
    state.set(newFilterState);
  }
}

export default Colour;
