/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-var */
/* eslint-disable no-useless-concat */
/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
/* eslint-disable-next-line max-classes-per-file */
/* eslint-disable no-undef */

function getFocusableElements(element) {
  return Array.from(
    element.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )
  ).filter((el) => !el.disabled && isVisible(el));
  function isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  }
}

document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'));

  if (summary.nextElementSibling.getAttribute('id')) {
    summary.setAttribute('aria-controls', summary.nextElementSibling.id);
  }

  summary.addEventListener('click', (event) => {
    event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  });

  if (summary.closest('header-drawer')) return;
  summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function () {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function (event) {
    if (event.code.toUpperCase() !== 'TAB') return;

    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  elementToFocus.focus();
}

try {
  document.querySelector(":focus-visible");
} catch (e) {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  const navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN']
  let currentFocusedElement = null;
  let mouseClick = null;

  window.addEventListener('keydown', (event) => {
    if (navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });

  window.addEventListener('mousedown', (_event) => {
    mouseClick = true;
  });

  window.addEventListener('focus', () => {
    if (currentFocusedElement) currentFocusedElement.classList.remove('focused');

    if (mouseClick) return;

    currentFocusedElement = document.activeElement;
    currentFocusedElement.classList.add('focused');

  }, true);
}


const focusTraps = {};

function trapFocusForForm(form) {
  const elements = getFocusableElements(form);
  const first = elements[0];
  const last = elements[elements.length - 1];

  removeTrapFocusForm(form.id);

  trapFocusHandlers.keydown = function (event) {
    if (event.code.toUpperCase() !== 'TAB') return;

    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    if (
      (event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  form.addEventListener('focusout', trapFocusHandlers.focusout);
  form.addEventListener('focusin', trapFocusHandlers.focusin);
  form.addEventListener('keydown', trapFocusHandlers.keydown);

  first.focus();
}

function submitFormAndMoveToNext(form, nextForm) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.removeEventListener('focusout', trapFocusHandlers.focusout);
    form.removeEventListener('focusin', trapFocusHandlers.focusin);
    form.removeEventListener('keydown', trapFocusHandlers.keydown);

    if (nextForm) {
      trapFocusForForm(nextForm);
    } else {
      closeModal();
    }
  });
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

function removeTrapFocusForm(formId) {
  const trap = focusTraps[formId];
  if (trap) {
    const form = document.getElementById(formId);
    form.removeEventListener('keydown', trap);
    delete focusTraps[formId];
  }
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;

  const openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;

  const summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.setAttribute('aria-expanded', false);
  summaryElement.focus();
}

class ModalDialog extends HTMLElement {
  constructor() {
    super();

    const closeButtons = this.querySelectorAll('[id^="ModalClose-"]');
    closeButtons.forEach((button) => {
      button.addEventListener('click', this.hide.bind(this, false));
    });

    this.addEventListener('keyup', (event) => {
      if (!event.code) return;
      if (event.code.toUpperCase() === 'ESCAPE') this.hide();
    });

    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) this.hide();
      });
    } else {
      this.addEventListener('click', (event) => {
        if (event.target === this) this.hide();
      });
    }
  }

  connectedCallback() {
    if (this.moved) return;
    this.moved = true;
    document.body.appendChild(this);
  }

  show(opener) {
    this.openedBy = opener;
    const popup = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    this.removeAttribute('closed', '');
    if (popup) popup.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    this.removeAttribute('open');
    this.setAttribute('closed', '');
    removeTrapFocus(this.openedBy);
  }
}
customElements.define('modal-dialog', ModalDialog);

class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('button');

    if (!button) return;
    button.addEventListener('click', () => {
      const modal = document.querySelector(this.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
  }
}
customElements.define('modal-opener', ModalOpener);

// Check device:

function isMobileDevice() {
  const userAgentCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const screenSizeCheck = window.innerWidth <= 800 && window.innerHeight <= 600;

  return userAgentCheck || screenSizeCheck;
}

// example usage:

if (isMobileDevice()) {
  // mobile
} else {
  // desktop
}