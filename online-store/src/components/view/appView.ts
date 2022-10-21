import ElementBuilder from './element-builder';
import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';

export class AppView extends ElementBuilder {
  header: Header | undefined;
  main: Main | undefined;
  footer: Footer | undefined;

  initialize() {
    this.render();
    this.header = new Header({ selector: '.header' });
    this.main = new Main({ selector: '.main' });
    this.footer = new Footer({ selector: '.footer' });
  }

  render() {
    this.element.innerHTML = `
      <div class="header"></div>
      <main class="main"></main>
      <footer class="footer"></footer>
      <div class="modal-container"></div>
    `;
  }
}
