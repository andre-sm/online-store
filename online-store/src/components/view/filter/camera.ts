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
      <h3 class="filter-section__title">Cameras quantity</h3>
      <div class="filter-section__body checkbox-filter">
        <label for="1" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input camera-checkbox" ${
            this.filters?.camera.includes('1') ? 'checked' : ''
          } id="1" name="camera">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">1</span>
        </label>
        <label for="2" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input camera-checkbox" ${
            this.filters?.camera.includes('2') ? 'checked' : ''
          } id="2" name="camera">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">2</span>
        </label>
        <label for="3" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input camera-checkbox" ${
            this.filters?.camera.includes('3') ? 'checked' : ''
          } id="3" name="camera">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">3</span>
        </label>
        <label for="4" class="filter-section__checkbox checkbox">
          <input type="checkbox" class="checkbox__input camera-checkbox" ${
            this.filters?.camera.includes('4') ? 'checked' : ''
          } id="4" name="camera">
          <span class="checkbox__custom-checkbox"></span>
          <span class="checkbox__text">4</span>
        </label>
      </div>
    `;

    const productContainer = this.element.querySelectorAll('.camera-checkbox') as NodeListOf<Element>;
    productContainer.forEach((item) => item.addEventListener('click', this.filterChange));
  }

  filterChange() {
    const collection = document.querySelectorAll('input[name="camera"]:checked');
    const selectedCameras: string[] = [];
    collection.forEach((node) => selectedCameras.push(node.id));
    const filters = state.get('filters');
    const newFilterState = { filters: { ...filters, camera: selectedCameras } };
    state.set(newFilterState);
  }
}

export default Colour;
