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
      <h3 class="filter-section__title">Colour</h3>
      <div class="filter-section__body checkbox-filter">
        <label for="white" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input colour-checkbox" ${
            this.filters?.colour.includes('white') ? 'checked' : ''
          } id="white" name="colour">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">White</span>
        </label>
        <label for="black" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input colour-checkbox" ${
            this.filters?.colour.includes('black') ? 'checked' : ''
          } id="black" name="colour">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Black</span>
        </label>
        <label for="green" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input colour-checkbox" ${
            this.filters?.colour.includes('green') ? 'checked' : ''
          } id="green" name="colour">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Green</span>
        </label>
        <label for="blue" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input colour-checkbox" ${
            this.filters?.colour.includes('blue') ? 'checked' : ''
          } id="blue" name="colour">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Blue</span>
        </label>
        <label for="red" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input colour-checkbox" ${
            this.filters?.colour.includes('red') ? 'checked' : ''
          } id="red" name="colour">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Red</span>
        </label>
        <label for="yellow" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input colour-checkbox" ${
            this.filters?.colour.includes('yellow') ? 'checked' : ''
          } id="yellow" name="colour">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">Yellow</span>
        </label>
      </div>
    `;

    const productContainer = this.element.querySelectorAll('.colour-checkbox') as NodeListOf<Element>;
    productContainer.forEach((item) => item.addEventListener('click', this.filterChange));
  }

  filterChange() {
    const collection = document.querySelectorAll('input[name="colour"]:checked');
    const selectedColours: string[] = [];
    collection.forEach((node) => selectedColours.push(node.id));
    const filters = state.get('filters');
    const newFilterState = { filters: { ...filters, colour: selectedColours } };
    state.set(newFilterState);
  }
}

export default Colour;
