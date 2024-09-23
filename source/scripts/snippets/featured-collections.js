import { linkTabAndPanel, activateTabPanel, deactivateTabPanel } from 'UTILS/aria-helper';

const featuredCollectionsTabs = document.querySelectorAll('.featured-collections__tab');

const getPanel = (index) => {
  return document.getElementById(`featured-collections__panel-${index}`);
};

const handleClick = (e) => {
  featuredCollectionsTabs.forEach((tab) => {
    deactivateTabPanel(tab);
  });
  activateTabPanel(e.target);
};

if (featuredCollectionsTabs.length) {
  featuredCollectionsTabs.forEach((tab, i) => {
    linkTabAndPanel(tab, getPanel(i));
    tab.addEventListener('click', (e) => handleClick(e));
  });
}
