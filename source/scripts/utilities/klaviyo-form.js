/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
class KlaviyoForm extends HTMLElement {
  constructor() {
    super();

    const url = 'https://manage.kmail-lists.com/ajax/subscriptions/subscribe';
    this.rsp = this.querySelector('.response');
    this.form = this.querySelector('form');
    this.npts = this.querySelectorAll('input');
    this.form.addEventListener('submit', (event) => {
      this.dtFrm = '';
      event.preventDefault();
      this.encodeToURI(this.npts);
      this.submitToKlaviyo(url, this.rsp, this.dtFrm);
    });
  }

  setResponseMessages({ alreadySubscribedMessage, successMessage, errorMessage }) {
    this.alreadySubscribedMessage = alreadySubscribedMessage;
    this.successMessage = successMessage;
    this.errorMessage = errorMessage;
  }

  encodeToURI(npts) {
    npts.forEach((selector) => {
      this.dtFrm += '&' + selector.name + '=' + encodeURIComponent(selector.value);
    });
  }

  submitToKlaviyo(url, rsp, dtFrm) {
    const submitButton = this.querySelector('[type="submit"]');
    const buttonSpinner = submitButton.querySelector('.loading-spinner');

    if (submitButton.getAttribute('aria-disabled') === 'true') return;

    submitButton.setAttribute('aria-disabled', true);
    submitButton.classList.add('loading');
    buttonSpinner.classList.remove('hidden');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const rspns = JSON.parse(xhr.response);
        const stts = rspns.data.is_subscribed;
        const statusof = rspns.success;
        if (statusof === false) {
          rsp.style.color = 'red';
          rsp.innerHTML = rspns.errors[0];
          submitButton.setAttribute('aria-disabled', 'false');
          submitButton.classList.remove('loading');
          buttonSpinner.classList.add('hidden');
        } else if (stts === true) {
          rsp.style.color = 'red';
          rsp.innerHTML = 'Already subscribed';
          submitButton.setAttribute('aria-disabled', 'false');
          submitButton.classList.remove('loading');
          buttonSpinner.classList.add('hidden');
        } else if (statusof === true && stts === false) {
          rsp.style.color = 'green';
          rsp.innerHTML = 'Success';
          submitButton.setAttribute('aria-disabled', 'false');
          submitButton.classList.remove('loading');
          buttonSpinner.classList.add('hidden');
        } else {
          rsp.style.color = 'red';
          rsp.innerHTML = 'Error';
          submitButton.setAttribute('aria-disabled', 'false');
          submitButton.classList.remove('loading');
          buttonSpinner.classList.add('hidden');
        }
      }
    };

    xhr.send(dtFrm);
  }
}

customElements.define('klaviyo-form', KlaviyoForm);
