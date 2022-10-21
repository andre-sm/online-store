import ElementBuilder from '../element-builder';
import state from '../../state/state';
import { Filters } from '../../../interfaces/filters';

class Quantity extends ElementBuilder {
  filters: Filters | undefined;
  rangeSlider: HTMLElement | undefined;
  initialize() {
    this.filters = state.get('filters');
    this.render();
    this.rangeSlider = this.element.querySelector('.range-slider') as HTMLElement;
    this.changeSliderColour(
      this.filters?.quantity.from as number,
      this.filters?.quantity.to as number,
      20,
      this.rangeSlider
    );
  }

  render() {
    this.element.innerHTML = `
      <h3 class="filter-section__title">Quantity</h3>
      <div class="filter-section__body">
        <div class="range-filter">
          <div class="range-filter__values">
            <span id="range-one">${this.filters?.quantity.from}</span>
            <span>&dash;</span>
            <span id="range-two">${this.filters?.quantity.to}</span>
          </div>
          <div class="range-slider"></div>
          <input type="range" class="range-filter__input" min="0" max="20" step="1" value="${this.filters?.quantity.from}">
          <input type="range" class="range-filter__input" min="0" max="20" step="1" value="${this.filters?.quantity.to}">
        </div>
      </div>
    `;

    this.addListeners();
  }

  addListeners() {
    const sliders = this.element.querySelectorAll('.range-filter__input');
    const sliderOne = sliders[0] as HTMLInputElement;
    const sliderTwo = sliders[1] as HTMLInputElement;
    const valueOne = this.element.querySelector('#range-one') as HTMLElement;
    const valueTwo = this.element.querySelector('#range-two') as HTMLElement;

    sliderOne.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (+sliderOne.value > +sliderTwo.value) {
        sliderTwo.value = sliderOne.value;
        valueTwo.innerText = target.value;
      }
      valueOne.innerText = target.value;
      this.changeSliderColour(+sliderOne.value, +sliderTwo.value, +sliderTwo.max, this.rangeSlider);
    });

    sliderTwo.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (+sliderTwo.value < +sliderOne.value) {
        sliderOne.value = sliderTwo.value;
        valueOne.innerText = target.value;
      }
      valueTwo.innerText = target.value;
      this.changeSliderColour(+sliderOne.value, +sliderTwo.value, +sliderTwo.max, this.rangeSlider);
    });

    sliders.forEach((slider) => {
      slider.addEventListener('change', () => {
        const filters = state.get('filters');
        const newFilterState = { filters: { ...filters, quantity: { from: +sliderOne.value, to: +sliderTwo.value } } };
        state.set(newFilterState);
      });
    });
  }

  changeSliderColour(valueOne: number, valueTwo: number, maxValue: number, rangeSlider: HTMLElement | undefined) {
    const percentPositionOne = (valueOne * 100) / maxValue;
    const percentPositionTwo = (valueTwo * 100) / maxValue;
    if (rangeSlider) {
      rangeSlider.style.background = `linear-gradient(to right, #e3e3e3 ${percentPositionOne}%, #ffdd22 ${percentPositionOne}%, #ffdd22 ${percentPositionTwo}%, #e3e3e3 ${percentPositionTwo}%)`;
    }
  }
}

export default Quantity;
