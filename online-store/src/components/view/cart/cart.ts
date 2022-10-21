import ElementBuilder from '../element-builder';
import state from '../../state/state';

class Cart extends ElementBuilder {
  cartCount: number | undefined;

  initialize() {
    state.select('cartProducts').subscribe((cartCount) => {
      this.cartCount = cartCount.length;
      this.render();
    });
  }

  render() {
    this.element.innerHTML = `
      <a href="" class="cart">
        <i class="cart__icon"></i>
        <span class="cart__number">${this.cartCount}</span>
      </a>
    `;
  }
}

export default Cart;
