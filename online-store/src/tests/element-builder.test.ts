/**
 * @jest-environment jsdom
 */
import ElementBuilder from './../components/view/element-builder';
import { ComponentConfig } from './../components/view/element-builder';

const config: ComponentConfig = {
  className: 'test-class',
  idName: 'testId',
  tagName: 'div',
};

class View extends ElementBuilder {
  initialize() {
    this.render();
  }

  render() {
    return (this.element.innerHTML = `<span>Test</span>`);
  }

  getElement() {
    return this.element;
  }
}

describe('ElementBuilder', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    const view = new View(config);
    expect(view).toBeDefined();
  });

  it('should call render method', () => {
    const spy = jest.spyOn(View.prototype, 'initialize');
    new View(config);
    expect(spy).toBeCalled();
  });

  it('should add proper class to the element', () => {
    const view = new View(config);
    const element = view.getElement();
    expect(element.classList).toContain('test-class');
  });

  it('should add proper id to the element', () => {
    const view = new View(config);
    const element = view.getElement();
    expect(element.id).toBe('testId');
  });

  it('should create element with proper tag', () => {
    const view = new View(config);
    const element = view.getElement();
    expect(element.tagName).toBe('DIV');
  });
});
