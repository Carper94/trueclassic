/* eslint-disable no-console */
import { createFocusTrap } from 'focus-trap';
import { linkTabAndPanel, activateTabPanel, deactivateTabPanel } from 'UTILS/aria-helper';
import { toggleChildrenAnchors } from 'SECTIONS/mobile-nav';

const main = document.querySelector('#MainContent');
const navTabs = document.querySelectorAll('.nav__tab');
const mobileNavSection = document.querySelector('.section-mobile-nav');

// Desktop Nav
const subnavContainer = document.querySelector('#header-subnavs');
const subnavTrap = createFocusTrap(subnavContainer, {
  clickOutsideDeactivates: true,
});
const searchOpenButton = document.querySelector('#nav__tab--search');
const searchCloseButton = document.querySelector('#nav__search-close');
const searchInput = document.querySelector('.searchbar__input');
let isSearchActive = false;
const noExitClass = 'header-element';
const timeoutDuration = 500;
let timeoutId = null;

// Mobile Nav
const mobileNavContainer = document.querySelector('#mobile-nav-container');
const mobileBackButton = document.querySelector('#mobile-nav-back-button');
const mobileCloseButton = document.querySelector('#mobile-nav-close');
const mobileSubnavTrap = createFocusTrap(mobileNavContainer, {
  clickOutsideDeactivates: true,
});

const getNavElementByTab = (tab, name) => {
  const panelId = tab.id.replace('tab', name);
  return document.getElementById(panelId);
};

const isMobileElement = (element) => {
  return element.id.includes('mobile');
};

const deactivateTrap = () => {
  subnavTrap.deactivate();
  mobileSubnavTrap.deactivate();
};

const activateTrap = (tab) => {
  if (isMobileElement(tab)) {
    mobileSubnavTrap.activate();
  } else {
    subnavTrap.activate();
  }
};

const deactivateSubnav = () => {
  if (mobileNavSection) {
    toggleChildrenAnchors(mobileNavSection, '-1');
  }
  // showNavMenuButton.focus();
  navTabs.forEach((tab) => {
    deactivateTabPanel(tab);
    if (isMobileElement(tab) && mobileNavContainer) {
      mobileNavContainer.classList.remove('panel-active');
    } else if (subnavContainer) {
      subnavContainer.classList.remove('active');
    }
  });
  deactivateTrap();
  isSearchActive = false;
};

const activateSubnav = (tab) => {
  activateTabPanel(tab);
  if (isMobileElement(tab) && mobileNavContainer) {
    mobileNavContainer.classList.add('panel-active');
  } else if (subnavContainer) {
    subnavContainer.classList.add('active');
  }
};

const handleTabActive = (e, tab) => {
  // Deactivate all & activate active
  deactivateSubnav();
  activateSubnav(tab);
};

const timeoutSubnav = (e) => {
  // Don't exit if user moused into another header element
  const el = e.toElement;
  const isExit = el ? !el.classList.contains(noExitClass) : true;
  if (isExit && !isSearchActive) {
    timeoutId = setTimeout(() => {
      deactivateSubnav();
    }, timeoutDuration);
  }
};

const escapeSubnav = (e) => {
  if (e.key === 'Escape') {
    deactivateSubnav();
  }
};

const toggleSearchBar = (tab) => {
  if (!isSearchActive) {
    deactivateSubnav();
    isSearchActive = true;
    activateSubnav(tab);
    searchInput.focus();
  } else {
    deactivateSubnav();
  }
};

const setupTabPanels = () => {
  navTabs.forEach((tab) => {
    const panel = getNavElementByTab(tab, 'panel');
    const tabLink = getNavElementByTab(tab, 'link');
    if (panel) {
      linkTabAndPanel(tab, panel);
      if (tabLink) {
        // Attach listener for standard link click interaction
        tabLink.addEventListener('mouseover', (e) => {
          clearTimeout(timeoutId);
          handleTabActive(e, tab);
        });
        tabLink.addEventListener('mouseout', (e) => timeoutSubnav(e));
        // Attach listener for accessible tabbable interaction
        tab.addEventListener('click', (e) => {
          handleTabActive(e, tab);
          activateTrap(tab);
        });
      } else if (searchOpenButton) {
        searchOpenButton.addEventListener('click', () => toggleSearchBar(tab));
        searchCloseButton.addEventListener('click', () => deactivateSubnav());
      }
    }
  });
};

const setupControlListeners = () => {
  try {
    // If user leaves subnav, deactivate...eventually
    subnavContainer.addEventListener('mouseleave', (e) => timeoutSubnav(e));
    // If user re-enters subnav in time, don't deactivate
    subnavContainer.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    // Accessibile subnav deactivation
    subnavContainer.addEventListener('keydown', (e) => escapeSubnav(e));
    mobileNavContainer.addEventListener('keydown', (e) => escapeSubnav(e));
    // Mobile menu specific
    mobileBackButton.addEventListener('click', () => deactivateSubnav());
    mobileCloseButton.addEventListener('click', () => deactivateSubnav());
    // Outside click deactivates
    main.addEventListener('click', () => deactivateSubnav());

    // headerNavWrapper.addEventListener('click', () => deactivateSubnav());
  } catch (error) {
    console.error(error);
  }
};

if (navTabs.length) {
  setupTabPanels();
  setupControlListeners();
}
