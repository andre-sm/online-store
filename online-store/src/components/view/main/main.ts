import ElementBuilder from '../element-builder';
import Filter from '../filter/filter';
import Sort from '../sort/sort';
import Products from '../products/products';
import state from '../../state/state';
import { showModal } from '../modal/modal';

class Main extends ElementBuilder {
  filter: Filter | undefined;
  sort: Sort | undefined;
  products: Products | undefined;

  initialize() {
    this.render();
    this.filter = new Filter({ selector: '.filter-wrapper' });
    this.sort = new Sort({ selector: '.sorting' });
    this.products = new Products({ selector: '.products-list' });
  }

  render() {
    this.element.innerHTML = `
      <div class="container main-container">
        <aside class="filter-container">
          <h2 class="filter__title">Filter</h2>
          <div class="filter-wrapper"></div>
        </aside>
        <div class="page-content">
          <h1 class="page-content__title">Phones</h1>
          <div class="products-container">
            <section class="sorting"></section>
            <section class="products-list"></section>
          </div>
        </div>
      </div>
    `;

    const productContainer = this.element.querySelector('.products-list') as HTMLElement;
    productContainer.addEventListener('click', this.addToCart);
  }

  addToCart(e: Event) {
    const target = e.target as HTMLElement;
    const clickedProduct = target.closest('.product') as HTMLElement;

    if (!clickedProduct) return;
    const clickedProductId: number = +(clickedProduct.dataset.id as string);

    if (target.classList.contains('product__favorite-icon')) {
      const favoriteProductsIds = state.get('favoriteProducts');

      if (favoriteProductsIds.includes(clickedProductId)) {
        target.classList.remove('active');
        const newFavoriteProducts = favoriteProductsIds.filter((id: number) => id !== clickedProductId);
        state.set({ favoriteProducts: newFavoriteProducts });
      } else {
        target.classList.add('active');
        favoriteProductsIds.push(clickedProductId);
        state.set({ favoriteProducts: favoriteProductsIds });
      }
      return;
    }
    const cartProductsIds = state.get('cartProducts');

    if (cartProductsIds.includes(clickedProductId)) {
      clickedProduct.classList.remove('active');
      const newCartProducts = cartProductsIds.filter((id: number) => id !== clickedProductId);
      state.set({ cartProducts: newCartProducts });
    } else {
      if (cartProductsIds.length >= 20) {
        showModal('Sorry, all slots are full');
        return;
      }
      clickedProduct.classList.add('active');
      cartProductsIds.push(clickedProductId);
      state.set({ cartProducts: cartProductsIds });
    }
  }
}

export default Main;
