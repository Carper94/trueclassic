import focusElement from 'ACCESSIBILITY/focusElement';
import domElementsFound from 'DOM/domElementsFound';

const selectors = {
  errorList: 'form .errors',
  errorMessage: '[data-error-message]',
};

const focusFormErrors = () => {
  const errorList = document.querySelector(selectors.errorList);

  if (!domElementsFound(errorList)) return;

  if (errorList.children.length > 0) {
    const parent = errorList.parentElement;
    const errorMessage = parent.querySelector('[data-error-message]');
    const focusTarget = domElementsFound(errorMessage) ? errorMessage : errorList;
    focusElement(focusTarget, { makeFocusable: true });
  }
};

focusFormErrors();

export default focusFormErrors;
