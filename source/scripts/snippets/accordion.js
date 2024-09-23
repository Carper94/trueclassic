import { linkTabAndPanel, toggleTabActivation } from 'UTILS/aria-helper';

const accordionTabs = document.querySelectorAll('.accordion__tab');

const toggleAccordion = (e, activePanel) => {
  const activeTab = e.target;
  // Toggle accessibility attributes to match open or closed panel state
  toggleTabActivation(activeTab);
  // Toggle tab and panel styles
  activeTab.classList.toggle('accordion__tab--active');
  activePanel.classList.toggle('accordion__panel--active');
};

const initAccordions = (accordionTabs) => {
  const panels = document.querySelectorAll('.accordion__panel');
  accordionTabs.forEach((tab, i) => {
    const panel = panels[i];
    if (panel) {
      // Create unique id's for tabs and panels
      tab.setAttribute('id', `accordion-tab-${i}`);
      panel.setAttribute('id', `accordion-panel-${i}`);
      // Link panel and tab for accesibility
      linkTabAndPanel(tab, panel);
      // Attach click handler to tab
      tab.addEventListener('click', (e) => toggleAccordion(e, panel));
    }
  });
};

if (accordionTabs.length) {
  initAccordions(accordionTabs);
}
export default initAccordions;
