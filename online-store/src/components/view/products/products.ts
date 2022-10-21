import ElementBuilder from '../element-builder';
import { Product } from '../../../interfaces/product';
import state from '../../state/state';

export default class Products extends ElementBuilder {
  products: Product[] | undefined;
  initialize() {
    state.select('products').subscribe((products) => {
      this.products = products;
      this.render();
    });
  }
  render() {
    const allProducts = this.products
      ?.map((item) => {
        const product = new ProductView(item);
        return product.render();
      })
      ?.join('');

    const loading = state.get('loading');
    this.element.innerHTML =
      allProducts || loading ? `${allProducts}` : `<span class="message">Sorry, there is no such product</span>`;
  }
}

class ProductView {
  product: Product;
  cartProducts: number[] | undefined;
  favoriteProducts: number[] | undefined;
  constructor(product: Product) {
    this.product = product;
    this.cartProducts = state.get('cartProducts');
    this.favoriteProducts = state.get('favoriteProducts');
  }

  render() {
    return `
      <div class="product ${this.cartProducts?.includes(+this.product.id) ? 'active' : ''}" data-id="${
      this.product.id
    }">
        <div class="product__name">
          <span class="product__brand">${this.product.brand}</span>
          <span class="product__model">${this.product.model}</span>
          ${this.product.popular ? '<span class="product__popular-label">Hot</span>' : ''}
        </div>
        <img class="product__image product-feature" src="${this.product.image}" alt="${this.product.model}">
        <span class="product__colour product-feature">Colour: ${this.product.colour}</span>
        <span class="product__screen product-feature">Screen: ${this.product.screen}"</span>
        <span class="product__release-year product-feature">Release: ${this.product.release}</span>
        <span class="product__cameras product-feature">Cameras quantity: ${this.product.camera}</span>
        <span class="product__in-stock product-feature">In stock: ${this.product.quantity}</span>
        <div class="product__price-wrapper">
          <h3 class="product__price">${this.product.price} $</h3>
          <i class="product__favorite-icon ${this.favoriteProducts?.includes(+this.product.id) ? 'active' : ''}"></i>
          <button class="cart-btn"><i class="product__cart-icon"></i></button>
        </div>
      </div>
    `;
  }
}
