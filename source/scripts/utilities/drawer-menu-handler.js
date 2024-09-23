import sleep from 'UTILS/sleep';

const body = document.querySelector('body');

export async function showMenu(element, trap) {
  element.classList.add('active');
  element.setAttribute('aria-hidden', false);
  await sleep(50);
  trap.activate();
  body.classList.add('drawer-menu-is-open');
}

export async function hideMenu(element, trap) {
  element.classList.remove('active');
  element.setAttribute('aria-hidden', true);
  await sleep(50);
  trap.deactivate();
  body.classList.remove('drawer-menu-is-open');
}
