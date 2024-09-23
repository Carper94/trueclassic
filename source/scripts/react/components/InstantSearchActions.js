import { h } from 'preact';

function InstantSearchActions({ query, closeDropdown }) {
  const searchUrl = `${window.Shopify.routes.root}search?q=${query}`;
  return (
    <div className="instant-search-actions">
      <a href={searchUrl} className="button dark">
        See all results
      </a>
      <button type="button" onClick={closeDropdown} className="button light">
        Close
      </button>
    </div>
  );
}

export default InstantSearchActions;
