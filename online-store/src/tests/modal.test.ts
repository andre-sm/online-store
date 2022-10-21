/**
 * @jest-environment jsdom
 */
import { showModal } from './../components/view/modal/modal';

describe('Modal', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="modal-container"></div>';
  });

  it('#showModal should add modal element in the container with proper message', () => {
    showModal('Test');
    const element = document.getElementsByClassName('modal-message')[0];
    expect(element.innerHTML).toContain('Test');
  });

  it('#showModal should hide modal after 1500ms', async () => {
    showModal('Test');
    const element = document.getElementsByClassName('modal-container')[0];
    expect(element.classList).toContain('show');
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
    await promise;
    expect(element.classList).not.toContain('show');
  });
});
