/* eslint-disable camelcase */
import { createFocusTrap } from 'focus-trap';
import { showMenu, hideMenu } from 'UTILS/drawer-menu-handler';

const mobileNavSection = document.querySelector('.section-mobile-nav');
const mobileNavTrap = document.querySelector('[data-mobile-nav-focustrap]');
const mobileNavs = document.querySelector('#mobile-navs');
const showNavMenuButton = document.getElementById('primary-nav-toggle');
// Elements that hide menu on click (ex. close button, scrim area)
const hideMenuElementIds = ['mobile-nav-close', 'shopify-section-mobile-nav'];

const trap = createFocusTrap(mobileNavTrap, {
  clickOutsideDeactivates: true,
});

export function toggleChildrenAnchors(el, indexValue) {
  const anchors = el.querySelectorAll('a, button, input');
  anchors.forEach((anchor) => {
    anchor.setAttribute('tabindex', indexValue);
  });
}

const showMobileNav = () => {
  showMenu(mobileNavSection, trap);
  if (mobileNavSection) {
    toggleChildrenAnchors(mobileNavSection, '0');
  }
};

const hideMobileNav = () => {
  hideMenu(mobileNavSection, trap);
};

const mobileNavHandleClick = (e) => {
  if (hideMenuElementIds.indexOf(e.target.id) !== -1) {
    hideMobileNav();
  }
};

const escapeMobileNav = (e) => {
  if (e.key === 'Escape') {
    hideMobileNav();
  }
};

showNavMenuButton.addEventListener('click', (e) => showMobileNav(e));
mobileNavs.addEventListener('keydown', (e) => escapeMobileNav(e));
mobileNavSection.addEventListener('click', (e) => mobileNavHandleClick(e));
if (mobileNavSection) {
  toggleChildrenAnchors(mobileNavSection, '-1');
}

export default toggleChildrenAnchors;
