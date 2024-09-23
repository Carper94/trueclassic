import { h, render } from 'preact';
import InstantSearchDropdownApp from '../react/InstantSearchDropdownApp';

const selectors = {
  instantSearchDropdown: '.instant-search-dropdown',
};

const instantSearchDropdowns = document.querySelectorAll(selectors.instantSearchDropdown);

instantSearchDropdowns.forEach((instantSearchDropdown) => {
  const { mode } = instantSearchDropdown.dataset;
  render(
    <InstantSearchDropdownApp parent={instantSearchDropdown} mode={mode} />,
    instantSearchDropdown
  );
});
