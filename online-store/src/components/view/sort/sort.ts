import ElementBuilder from '../element-builder';
import state from '../../state/state';

class Sort extends ElementBuilder {
  sortingIndex: number | undefined;
  initialize() {
    this.sortingIndex = state.get('sortingIndex');
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <div class="sorting__wrapper">
      <label for="sorting-select" class="sorting__sort-by">Sort by</label>
      <div class="sorting__select">
        <select id="sorting-select">
          <option ${this.sortingIndex === 0 ? 'selected' : ''} value="0">Price, Lower first</option>
          <option ${this.sortingIndex === 1 ? 'selected' : ''} value="1">Price, Higher first</option>
          <option ${this.sortingIndex === 2 ? 'selected' : ''} value="2">Brand, A-Z</option>
          <option ${this.sortingIndex === 3 ? 'selected' : ''} value="3">Brand, Z-A</option>
          <option ${this.sortingIndex === 4 ? 'selected' : ''} value="4">Year, Older first</option>
          <option ${this.sortingIndex === 5 ? 'selected' : ''} value="5">Year, Newer first</option>
        </select>
        <i class="sorting__icon"></i>
      </div>
      </div>
      <button class="btn sorting-btn">Clear Storage</button>
    `;
    const sortSelect = this.element.querySelector('#sorting-select') as HTMLSelectElement;
    sortSelect.addEventListener('change', this.sortingChange);

    const sortingBtn = this.element.querySelector('.sorting-btn') as HTMLButtonElement;
    sortingBtn.addEventListener('click', (e: Event) => {
      e.preventDefault();
      localStorage.clear();
      window.location.reload();
    });
  }

  sortingChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const sortingIndex = target.selectedIndex;
    state.set({ sortingIndex: sortingIndex });
  }
}

export default Sort;
