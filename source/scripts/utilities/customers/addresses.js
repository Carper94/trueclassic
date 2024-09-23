/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly coupled to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

import { AddressForm } from 'UTILITIES/theme-addresses';

const selectors = {
  addressContainer: '[data-address]',
  addressFields: '[data-address-fields]',
  addressToggle: '[data-address-toggle]',
  addressForm: '[data-address-form]',
  addressDeleteForm: '[data-address-delete-form]',
};

const hideClass = 'hide';

const handleFormToggle = (addressForm) => {
  addressForm.classList.toggle(hideClass);
};

const initializeAddressForm = (container) => {
  const addressFields = container.querySelector(selectors.addressFields);
  const addressForm = container.querySelector(selectors.addressForm);
  const deleteForm = container.querySelector(selectors.addressDeleteForm);

  container.querySelectorAll(selectors.addressToggle).forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true' || false;
      button.setAttribute('aria-expanded', !expanded);
      handleFormToggle(addressForm);
    });
  });

  AddressForm(addressFields, 'en');

  if (deleteForm) {
    deleteForm.addEventListener('submit', (event) => {
      const confirmMessage = deleteForm.getAttribute('data-confirm-message');

      // TODO: Refactor this at some point to create a DOM warning
      // eslint-disable-next-line no-alert
      if (!window.confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
        event.preventDefault();
      }
    });
  }
};

const customerAddresses = () => {
  const addressForms = document.querySelectorAll(selectors.addressContainer);

  if (addressForms.length) {
    addressForms.forEach((addressContainer) => {
      initializeAddressForm(addressContainer);
    });
  }
};

export default customerAddresses;
