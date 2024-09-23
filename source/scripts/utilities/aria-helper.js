/* eslint-disable no-console */

export function linkTabAndPanel(tab, panel) {
  if (tab && panel) {
    panel.setAttribute('aria-labelledby', tab.id);
    // tab.setAttribute('aria-controls', panel.id);
  }
}

export function getPanelByTab(tab) {
  // Requires tabs and panels to have been linked
  if (!tab) return null;
  const panelId = tab.id.replace('tab', 'panel');
  return document.getElementById(panelId);
}

export function activateTabPanel(tab) {
  const panel = getPanelByTab(tab);
  if (tab && panel) {
    panel.classList.add('active');
    tab.classList.add('active');
    tab.setAttribute('aria-expanded', true);
    panel.setAttribute('aria-hidden', false);
  }
}

export function deactivateTabPanel(tab) {
  const panel = getPanelByTab(tab);
  if (tab && panel) {
    tab.classList.remove('active');
    panel.classList.remove('active');
    tab.setAttribute('aria-expanded', false);
    panel.setAttribute('aria-hidden', true);
  }
}

export function toggleTabActivation(tab) {
  const isExpanded = tab.getAttribute('aria-expanded') === 'true';
  const isSelected = tab.getAttribute('aria-selected') === 'true';
  tab.setAttribute('aria-expanded', !isExpanded);
  tab.setAttribute('aria-selected', !isSelected);
  tab.classList.toggle('active');
}
