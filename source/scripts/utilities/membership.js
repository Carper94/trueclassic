class MembershipOptions extends HTMLElement {
  constructor() {
    super();

    const accordions = document.querySelectorAll('.membership-types');

    const openAccordion = (accordion) => {
      const content = accordion.querySelector('.membership-content');
      accordion.classList.add('active');
      content.style.maxHeight = `${content.scrollHeight}px`;
    };

    const closeAccordion = (accordion) => {
      const content = accordion.querySelector('.membership-content');
      accordion.classList.remove('active');
      content.style.maxHeight = null;
    };

    accordions.forEach((accordion) => {
      const intro = accordion.querySelector('.membership-title');
      const content = accordion.querySelector('.membership-content');

      intro.onclick = () => {
        if (content.style.maxHeight) {
          closeAccordion(accordion);
        } else {
          accordions.forEach((accordion) => closeAccordion(accordion));
          openAccordion(accordion);
        }
      };
    });
  }
}

customElements.define('membership-options', MembershipOptions);
