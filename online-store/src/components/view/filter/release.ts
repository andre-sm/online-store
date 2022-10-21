import ElementBuilder from '../element-builder';
import state from '../../state/state';
import { Filters } from '../../../interfaces/filters';

class Release extends ElementBuilder {
  filters: Filters | undefined;
  rangeSlider: HTMLElement | undefined;
  initialize() {
    this.filters = state.get('filters');
    this.render();
    this.rangeSlider = this.element.querySelector('.range-slider') as HTMLElement;
    this.changeSliderColour(
      this.filters?.release.from as number,
      this.filters?.release.to as number,
      2018,
      2022,
      this.rangeSlider
    );
  }

  render() {
    this.element.innerHTML = `
      <h3 class="filter-section__title">Release Year</h3>
      <div class="filter-section__body">
        <div class="range-filter">
          <div class="range-filter__values">
            <span id="range-one">${this.filters?.release.from}</span>
            <span>&dash;</span>
            <span id="range-two">${this.filters?.release.to}</span>
          </div>
          <div class="range-slider"></div>
          <input type="range" class="range-filter__input" min="2018" max="2022" step="1" value="${this.filters?.release.from}">
          <input type="range" class="range-filter__input" min="2018" max="2022" step="1" value="${this.filters?.release.to}">
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
      this.changeSliderColour(+sliderOne.value, +sliderTwo.value, +sliderTwo.min, +sliderTwo.max, this.rangeSlider);
    });

    sliderTwo.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (+sliderTwo.value < +sliderOne.value) {
        sliderOne.value = sliderTwo.value;
        valueOne.innerText = target.value;
      }
      valueTwo.innerText = target.value;
      this.changeSliderColour(+sliderOne.value, +sliderTwo.value, +sliderTwo.min, +sliderTwo.max, this.rangeSlider);
    });

    sliders.forEach((slider) => {
      slider.addEventListener('change', () => {
        const filters = state.get('filters');
        const newFilterState = { filters: { ...filters, release: { from: +sliderOne.value, to: +sliderTwo.value } } };
        state.set(newFilterState);
      });
    });
  }

  changeSliderColour(
    valueOne: number,
    valueTwo: number,
    minValue: number,
    maxValue: number,
    rangeSlider: HTMLElement | undefined
  ) {
    const percentPositionOne = ((valueOne - minValue) * 100) / (maxValue - minValue);
    const percentPositionTwo = ((valueTwo - minValue) * 100) / (maxValue - minValue);
    if (rangeSlider) {
      rangeSlider.style.background = `linear-gradient(to right, #e3e3e3 ${percentPositionOne}%, #ffdd22 ${percentPositionOne}%, #ffdd22 ${percentPositionTwo}%, #e3e3e3 ${percentPositionTwo}%)`;
    }
  }
}

export default Release;
