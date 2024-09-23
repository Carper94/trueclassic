import focusElement from 'ACCESSIBILITY/focusElement';

/**
 * @param {DOM Element} element
 * @param {number} delay (ms)
 * @param {Object} options
 */
const delayedFocus = (element, delay, options = {}) => {
  setTimeout(focusElement(element, options), delay);
};

export default delayedFocus;
