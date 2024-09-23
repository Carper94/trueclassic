/* eslint-disable func-names */
import { createFocusTrap } from 'focus-trap';
import { showMenu, hideMenu } from 'UTILS/drawer-menu-handler';

(async function () {
  const state = { active: false };

  const sortDrawerWrapper = document.querySelector('.sort-drawer-wrapper');

  if (!sortDrawerWrapper) return false;

  const trap = createFocusTrap(sortDrawerWrapper);

  function showSortDrawer() {
    showMenu(sortDrawerWrapper, trap);
    state.active = true;
  }

  function hideSortDrawer() {
    hideMenu(sortDrawerWrapper, trap);
    state.active = false;
  }

  function handleFilterOpenClick(e) {
    if (e.target.dataset.delegate === 'sortdraweropen') {
      showSortDrawer();
    }
  }

  function handleFilterCloseClick(e) {
    if (e.target.dataset.delegate === 'sortdrawerclose') {
      hideSortDrawer();
    }
  }

  function setHistoryState(params) {
    // unescape required here because of shopify param bug
    // liquid filters cannot handle query strings like:
    // ?filter.p.product_type=Boxer%2CHat%2CPacks

    const historyState = `${window.location.pathname}${
      window.unescape(params.toString()).length ? '?' : ''
    }${window.unescape(params.toString())}`;
    window.history.pushState(null, '', historyState);
  }

  function handleFilterFormSubmit(e) {
    if (e.target.dataset.delegate === 'sortform') {
      e.preventDefault();
      const formData = new FormData(e.target);

      // get current params
      const params = new URLSearchParams(window.location.search);

      params.set('sort_by', formData.get('sort_by'));
      setHistoryState(params);
      hideSortDrawer();
      document.dispatchEvent(new Event('filterupdate'));
    }
  }

  function handleFilterFormChange(e) {
    if (e.target.form.dataset.delegate === 'sortform') {
      e.target.form.dispatchEvent(new Event('submit', { bubbles: true }));
    }
  }

  function handleOutsideClick(e) {
    if (state.active && !e.target.closest('.sort-drawer')) {
      hideSortDrawer();
    }
  }

  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('click', handleFilterOpenClick);
  document.addEventListener('click', handleFilterCloseClick);
  document.addEventListener('submit', handleFilterFormSubmit);
  document.addEventListener('change', handleFilterFormChange);

  return true;
})();
