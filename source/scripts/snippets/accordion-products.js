import { linkTabAndPanel, toggleTabActivation } from 'UTILS/aria-helper';

const accordionTabsProducts = document.querySelectorAll('.accordion__tab-products');

const toggleAccordionProducts = (e, activePanel) => {
  const activeTab = e.target;
  // Toggle accessibility attributes to match open or closed panel state
  toggleTabActivation(activeTab);
  // Toggle tab and panel styles
  activeTab.classList.toggle('accordion__tab--active');
  activePanel.classList.toggle('accordion__panel--active');
};

const initAccordionsProducts = (accordionTabsProducts) => {
  const panels = document.querySelectorAll('.accordion__panel-products');
  accordionTabsProducts.forEach((tab, i) => {
    const panel = panels[i];
    if (panel) {
      // Create unique id's for tabs and panels
      tab.setAttribute('id', `accordion-tab-product-${i}`);
      panel.setAttribute('id', `accordion-panel-product-${i}`);
      // Link panel and tab for accesibility
      linkTabAndPanel(tab, panel);
      // Attach click handler to tab
      tab.addEventListener('click', (e) => toggleAccordionProducts(e, panel));
    }
  });
};

if (accordionTabsProducts.length) {
  initAccordionsProducts(accordionTabsProducts);
}
export default initAccordionsProducts;
