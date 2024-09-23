/* eslint-disable no-const-assign */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
class LocalizationForm extends HTMLElement {
  constructor() {
    super();
    this.elements = {
      input: this.querySelector('input[name="language_code"], input[name="country_code"]'),
      button: this.querySelector('button'),
      panel: this.querySelector('ul'),
    };
    this.querySelectorAll('a').forEach((item) =>
      item.addEventListener('click', this.onItemClick.bind(this))
    );
    this.addEventListener('click', this.toggleSelector.bind(this));
    let _this = this;
    this.addEventListener('keyup', this.onContainerKeyUp.bind(this));
    document.addEventListener('click', function (e) {
      if (e.target.closest('localization-form') == null) {
        _this.hidePanel();
      }
    });
  }

  hidePanel() {
    this.elements.button.setAttribute('aria-expanded', 'false');
    this.elements.panel.setAttribute('hidden', true);
    this.querySelector('.disclosure svg').classList.remove('rotate');
  }

  onContainerKeyUp(event) {
    if (event.code.toUpperCase() !== 'ESCAPE') return;
    this.hidePanel();
    this.focus();
  }

  onItemClick(event) {
    event.preventDefault();
    const form = this.querySelector('form');
    this.elements.input.value = event.currentTarget.dataset.value;
    let countryCodeStored = event.currentTarget.dataset.value;
    countryCodeStored = countryCodeStored.toLowerCase();
    localStorage.setItem('country_code', countryCodeStored);
    if (form) form.submit();
  }

  toggleSelector() {
    const isPanelHidden = this.elements.panel.getAttribute('hidden');
    const isButtonExpanded = this.elements.button.getAttribute('aria-expanded') === 'true';
    if (isPanelHidden == null && isButtonExpanded) {
      this.hidePanel();
    } else {
      this.elements.panel.removeAttribute('hidden');
      this.elements.button.setAttribute('aria-expanded', 'true');
      this.querySelector('.disclosure svg').classList.add('rotate');
      this.focus();
    }
  }
}

customElements.define('localization-form', LocalizationForm);
