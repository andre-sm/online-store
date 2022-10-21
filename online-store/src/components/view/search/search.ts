import ElementBuilder from '../element-builder';
import state from '../../state/state';

class Search extends ElementBuilder {
  initialize() {
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <input type="search" class="search__input" placeholder="Search..." autofocus autocomplete="off">
      <button class="search-btn" disabled>
        <i class="search__icon"></i>
      </button>
    `;

    const searchInput = this.element.querySelector('.search__input') as HTMLInputElement;
    let searchtimer: ReturnType<typeof setTimeout>;

    searchInput.addEventListener('input', (e: Event) => {
      clearTimeout(searchtimer);
      searchtimer = setTimeout(() => {
        const target = e.target as HTMLInputElement;
        const filters = state.get('filters');
        state.set({ filters: { ...filters, search: target.value.trim() } });
      }, 500);
    });
  }
}

export default Search;
