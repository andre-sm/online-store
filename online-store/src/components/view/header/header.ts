import ElementBuilder from '../element-builder';
import Search from '../search/search';
import Cart from '../cart/cart';

class Header extends ElementBuilder {
  search: Search | undefined;
  cart: Cart | undefined;

  initialize() {
    this.render();
    this.search = new Search({ selector: '.search' });
    this.cart = new Cart({ selector: '.header-main__cart' });
  }

  render() {
    this.element.innerHTML = `
      <div class="header-top">
        <div class="container header-top__wrapper">
          <ul class="header-top__data header-contacts">
            <li class="header-contacts__phone"><a href="tel:+12345678910" class="phone-link">+(120) 345678910</a></li>
            <li class="header-contacts__email"><a href="mailto:@mobilestore.com" class="email-link">email@mobilestore.com</a></li>
          </ul>
          <ul class="header-top__data header-actions">
            <li class="header-actions__location"><a href="#" class="location-link">Store Location</a></li>
            <li class="header-actions__sign-in"><a href="#" class="sign-in-link">Sign In</a></li>
          </ul>
        </div>
      </div>
      <div class="header-main">
        <div class="container header-main__wrapper">
          <a href="./" class="header-main__logo">Mobile Store</a>
          <form class="search"></form>
          <div class="header-main__cart"></div>
        </div>
      </div>
    `;
  }
}

export default Header;
