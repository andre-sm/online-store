export function showModal(message = '') {
  const element = document.querySelector('.modal-container') as HTMLElement;
  element.innerHTML = `<span class="modal-message">${message}</span>`;

  element.classList.add('show');
  setTimeout(() => {
    element.classList.remove('show');
  }, 1500);
}
