/* eslint-disable no-undef */
class TooltipElement extends HTMLElement {
  constructor() {
    super();

    const mobileQuery = window.matchMedia('(max-width: 980px)');

    if (mobileQuery.matches) {
      this.addEventListener('click', (event) => {
        event.stopPropagation();
        this.toggleTooltip();
      });

      document.addEventListener('click', () => {
        this.closeTooltip();
      });
    }
  }

  toggleTooltip() {
    const tooltipContent = this.querySelector('.tooltip__content');
    tooltipContent.classList.toggle('tooltip__content--active');
  }

  closeTooltip() {
    const tooltipContent = this.querySelector('.tooltip__content');
    tooltipContent.classList.remove('tooltip__content--active');
  }
}

customElements.define('block-tooltip', TooltipElement);
