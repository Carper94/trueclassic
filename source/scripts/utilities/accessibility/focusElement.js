/**
 * Set document focus on an element. Contains param for tabindex
 * modification if needed.
 * @param {DOM Element} element
 * @param {boolean} makeFocusable
 */
const focusElement = (element, options = {}) => {
  let config = { makeFocusable: false };
  config = { ...config, ...options };
  element.focus();

  // Check whether element has received focus. If not,
  // set tabindex and try again.
  if (element !== document.activeElement && config.makeFocusable) {
    element.setAttribute('tabindex', '-1');
    element.focus();
  }
};

export default focusElement;
