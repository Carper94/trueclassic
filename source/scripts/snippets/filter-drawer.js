/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
import { createFocusTrap } from 'focus-trap';
import { showMenu, hideMenu } from 'UTILS/drawer-menu-handler';

(async function () {
  const state = { active: false };

  const filterDrawerWrapper = document.querySelector('.filter-drawer-wrapper');

  if (!filterDrawerWrapper) return false;

  const trap = createFocusTrap(filterDrawerWrapper);

  function showFilterDrawer() {
    showMenu(filterDrawerWrapper, trap);
    state.active = true;
  }

  function hideFilterDrawer() {
    hideMenu(filterDrawerWrapper, trap);
    state.active = false;
  }

  function handleFilterOpenClick(e) {
    if (e.target.dataset.delegate === 'filterdraweropen') {
      showFilterDrawer();
    }
  }

  function handleFilterCloseClick(e) {
    if (e.target.dataset.delegate === 'filterdrawerclose') {
      hideFilterDrawer();
    }
  }

  function setHistoryState(params) {
    // unescape required here because of shopify param bug
    // liquid filters cannot handle query strings like:
    // ?filter.p.product_type=Boxer%2CHat%2CPacks

    const historyState = `${window.location.pathname}${window.unescape(params.toString()).length ? '?' : ''
      }${window.unescape(params.toString())}`;
    window.history.pushState(null, '', historyState);
  }

  function clearHistoryState() {
    // get current params
    const params = new URLSearchParams(window.location.search);

    // clear all params starting with filter
    Array.from(params.entries()).forEach(([key]) => {
      if (key.match('filter.')) {
        params.delete(key);
      }
    });

    setHistoryState(params);
  }

  function handleFilterFormSubmit(e) {
    if (e.target.dataset.delegate === 'filterform') {
      e.preventDefault();
      const formData = new FormData(e.target);
      formData.set('filter.v.availability', 1);
      clearHistoryState();

      // get current params
      const params = new URLSearchParams(window.location.search);

      // create dictonary of filter params to values for AND filters
      const dictionary = {};
      Array.from(formData.entries()).forEach(([key, value]) => {
        // set OR filters
        params.append(key, value);
        // set params from dictionary
        // TODO set AND filters
        if (!dictionary[key]) dictionary[key] = [];
        dictionary[key].push(value);
      });

      setHistoryState(params);
      hideFilterDrawer();
      document.dispatchEvent(new Event('filterupdate'));
    }
  }

  function handleClearFilterButtonClick(e) {
    if (e.target.dataset.delegate === 'filterclear') {
      const { form } = e.target;
      form.elements.forEach((el) => {
        if (el.checked) {
          // eslint-disable-next-line no-param-reassign
          el.checked = false;
        }
      });

      // Reset active counts for each filter
      const filterListWrappers = document.querySelectorAll('.filter-list-wrapper');
      filterListWrappers.forEach((wrapper) => {
        const header = wrapper?.querySelector('.filter-list-head');
        const label = wrapper?.querySelector('.filter-list-head .active-count');

        if (header && label) {
          header.setAttribute('data-active-count', 0);
          label.innerHTML = 0;
        }
      });

      clearHistoryState();
      hideFilterDrawer();
      document.dispatchEvent(new Event('filterupdate'));
    }
  }

  function handleOutsideClick(e) {
    if (state.active && !e.target.closest('.filter-drawer')) {
      hideFilterDrawer();
    }
  }

  function handleFilterFormChange(e) {
    if (e.target.form.dataset.delegate === 'filterform') {
      const wrapper = e.target.closest('.filter-list-wrapper');
      const header = wrapper?.querySelector('.filter-list-head');
      const label = wrapper?.querySelector('.filter-list-head .active-count');

      if (header && label) {
        let newCount = parseInt(header.dataset.activeCount, 10);

        // Increment or decrement the count based on the checked status of the input element
        if (e.target.checked) {
          newCount += 1;
        } else {
          newCount -= 1;
        }

        header.setAttribute('data-active-count', newCount);
        label.innerHTML = newCount;
      }
    }
  }

  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('click', handleFilterOpenClick);
  document.addEventListener('click', handleFilterCloseClick);
  document.addEventListener('submit', handleFilterFormSubmit);
  document.addEventListener('click', handleClearFilterButtonClick);
  document.addEventListener('change', handleFilterFormChange);

  return true;
})();
