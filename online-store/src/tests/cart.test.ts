/**
 * @jest-environment jsdom
 */

import Cart from './../components/view/cart/cart';
import state from './../components/state/state';
import { Product } from './../interfaces/product';

const DEFAULT_STATE = {
  loading: false,
  cartProducts: [],
  favoriteProducts: [],
  sortingIndex: 0,
  filters: {
    search: '',
    brand: [],
    colour: [],
    camera: [],
    popular: false,
    price: {
      from: 0,
      to: 2000,
    },
    quantity: {
      from: 0,
      to: 20,
    },
    release: {
      from: 2018,
      to: 2022,
    },
  },
  products: [],
};

const products: Product[] = [
  {
    id: '1',
    brand: 'ASUS',
    model: 'ZenFone 8',
    price: 500,
    colour: 'Black',
    screen: 5.6,
    release: 2021,
    camera: '2',
    quantity: 4,
    popular: true,
    image: '../assets/img/product01.jpg',
  },
  {
    id: '2',
    brand: 'Google',
    model: 'Pixel 6',
    price: 800,
    colour: 'Black',
    screen: 6.4,
    release: 2022,
    camera: '2',
    quantity: 10,
    popular: false,
    image: '../assets/img/product02.jpg',
  },
  {
    id: '3',
    brand: 'Google',
    model: 'Pixel 4',
    price: 550,
    colour: 'White',
    screen: 5.7,
    release: 2020,
    camera: '2',
    quantity: 3,
    popular: false,
    image: '../assets/img/product03.jpg',
  },
];

describe('Cart', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="cart"></div>';
  });

  afterEach(() => {
    state.set(DEFAULT_STATE);
  });

  it('should create', () => {
    const cart = new Cart({
      tagName: 'div',
      idName: 'cart',
    });
    expect(cart).toBeDefined();
  });

  it('should set cartCount property from the state', () => {
    const cart = new Cart({
      tagName: 'div',
      idName: 'cart',
    });
    expect(cart.cartCount).toBe(0);
    state.set({ cartProducts: [1, 2, 3] });
    expect(cart.cartCount).toBe(3);
  });

  it('should render proper cart count value in DOM', () => {
    const cart = new Cart({
      selector: '#cart',
    });
    state.set({ cartProducts: [1, 2, 3, 4, 5] });
    const element = document.getElementById('cart');
    expect(element?.innerHTML).toContain('5');
  });
});
