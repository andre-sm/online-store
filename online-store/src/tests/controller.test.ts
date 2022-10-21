import AppController from './../components/controller/controller';
import { Product } from './../interfaces/product';

let controller: AppController;

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

const product: Product = {
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
};

describe('Controller', () => {
  beforeEach(() => {
    controller = new AppController();
  });

  it('should create', () => {
    expect(controller).toBeDefined();
  });

  it('#sortData should sort products by price in ascending order', () => {
    const expected = [
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
    ];
    const sortedProducts = controller.sortData(products, 0);
    expect(sortedProducts).toEqual(expected);
  });

  it('#sortData should sort products by release year in ascending order', () => {
    const expected = [
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
    ];
    const sortedProducts = controller.sortData(products, 4);
    expect(sortedProducts).toEqual(expected);
  });

  it('#searchFilter should filter product if brand or model contains search string', () => {
    const product = {
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
    };
    const matches = controller.searchFilter(product, 'google');
    expect(matches).toBe(true);
  });

  it('#releaseFilter should filter product if release year is in the provided range', () => {
    const matches = controller.releaseFilter(product, { from: 2019, to: 2021 });
    expect(matches).toBe(true);
  });

  it('#releaseFilter should not filter product if release year is not in the provided range', () => {
    const matches = controller.releaseFilter(product, { from: 2018, to: 2019 });
    expect(matches).toBe(false);
  });

  it('#quantityFilter should filter product if quantity is in the provided range', () => {
    const matches = controller.quantityFilter(product, { from: 3, to: 5 });
    expect(matches).toBe(true);
  });

  it('#quantityFilter should not filter product if quantity is not in the provided range', () => {
    const matches = controller.quantityFilter(product, { from: 11, to: 15 });
    expect(matches).toBe(false);
  });

  it('#priceFilter should filter product if price is in the provided range', () => {
    const matches = controller.priceFilter(product, { from: 500, to: 600 });
    expect(matches).toBe(true);
  });

  it('#priceFilter should not filter product if price is not in the provided range', () => {
    const matches = controller.priceFilter(product, { from: 900, to: 1100 });
    expect(matches).toBe(false);
  });
});
