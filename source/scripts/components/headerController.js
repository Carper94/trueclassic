import supportsIntersectionObserver from 'WINDOW/supportsIntersectionObserver';
import throttle from 'lodash/throttle';

const selectors = {
  headerSection: '.header-section',
  announcement: '.announcement-bar',
  header: '.header-wrapper',
  nav: '.header-nav-wrapper',
  subnav: '.header-subnav-wrapper',
};

let config = {
  atTopClass: 'header-at-top',
  stickyActiveClass: 'sticky-header-active',
  scrollUpClass: 'scroll--up',
  scrollDownClass: 'scroll--down',
  userScrolledUpClass: 'user-scrolled--up',
  userScrolledDownClass: 'user-scrolled--down',
};

let lastKnownScrollPos = 0;

export const setGlobalStyleProp = (prop, value) => {
  document.documentElement.style.setProperty(prop, value);
};

// Set height of el to arg or 0px (to prevent CSS bugs)
export const setGlobalPropHeight = (element, prop) => {
  const selector = document.querySelector(element);
  const value = selector ? `${selector.offsetHeight}px` : '0px';
  setGlobalStyleProp(prop, value);
};

// Set the --header-height CSS custom prop
const updateHeaderHeight = () => {
  setGlobalPropHeight(selectors.headerSection, '--header-section-height');
  setGlobalPropHeight(selectors.announcement, '--announcement-height');
  setGlobalPropHeight(selectors.header, '--header-height');
  setGlobalPropHeight(selectors.nav, '--nav-height');
  setGlobalPropHeight(selectors.subnav, '--subnav-height');
};

const setScrollBarWidth = () => {
  // Get scroll bar width and make it globally accessible
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  setGlobalStyleProp('--scrollbar-padding', `${scrollbarWidth}px`);
};

export const updateScrollStatus = () => {
  // user-scrolled--up
  const scrollbuffer = 40;
  const scrollPos = window.scrollY;
  const classlist = document.body.classList;

  // Unbuffered user scroll state
  if (scrollPos < lastKnownScrollPos) {
    classlist.remove(config.userScrolledDownClass);
    classlist.add(config.userScrolledUpClass);
  } else if (scrollPos > lastKnownScrollPos) {
    classlist.remove(config.userScrolledUpClass);
    classlist.add(config.userScrolledDownClass);
  }

  // Buffered header scroll state
  if (lastKnownScrollPos + scrollbuffer < scrollPos && window.innerHeight < scrollPos) {
    classlist.add(config.scrollDownClass);
    classlist.remove(config.scrollUpClass);
  } else if (lastKnownScrollPos - scrollbuffer > scrollPos) {
    classlist.add(config.scrollUpClass);
    classlist.remove(config.scrollDownClass);
  }

  if (scrollPos < 60) {
    document.body.classList.add(config.atTopClass);
  } else if (document.body.classList.contains(config.atTopClass)) {
    document.body.classList.remove(config.atTopClass);
  }

  // Optional for smooth floating
  const header = document.body.querySelector('.header-wrapper.sitebanner');
  if (header) {
    if (scrollPos < 84) {
      header.setAttribute('style', `top: ${84 - scrollPos}px;`);
    } else {
      header.removeAttribute('style');
    }
  }

  lastKnownScrollPos = scrollPos;
};

const throttledScrollStatus = throttle(updateScrollStatus, 100);

/**
 * Initialize the controller
 */

setScrollBarWidth();

const init = (options) => {
  config = { ...config, ...options };

  updateScrollStatus();

  // Set up the IntersectionObserver to toggle the sticky class
  if (supportsIntersectionObserver) {
    const headerSection = document.querySelector(selectors.headerSection);

    if (headerSection) {
      document.body.classList.add(config.stickyActiveClass);

      // Re-Set the header height property any time a class is toggled in the header
      const mutationObserverConfig = { attributes: true, childList: true, subtree: true };
      const headerObserver = new MutationObserver(updateHeaderHeight);
      headerObserver.observe(headerSection, mutationObserverConfig);

      document.addEventListener('scroll', throttledScrollStatus);
    }
  }
};

const headerController = {
  init,
};

export default headerController;
