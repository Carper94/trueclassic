import pickOne from 'pickoneitem';

let tabGroup;

const selectors = {
  accountSection: '[data-account-section]',
  sectionToggle: '[data-account-toggle]',
};

export function toggleAccountTabs(event) {
  const active = event.target.closest(selectors.accountSection);
  const forgotPasswordForm = document.querySelector('#recover-email');

  tabGroup.clear(); // Remove .hide from recover and login form

  if (active) {
    tabGroup.pick(active); // Hide previously active form
    forgotPasswordForm.focus();
  }
}

export function activateSectionToggle() {
  const toggle = document.querySelectorAll(selectors.sectionToggle);

  if (!toggle) return;

  tabGroup = pickOne();
  tabGroup.init({
    className: 'hide',
    group: selectors.accountSection,
  });

  toggle.forEach((button) => {
    button.addEventListener('click', toggleAccountTabs);
  });
}
