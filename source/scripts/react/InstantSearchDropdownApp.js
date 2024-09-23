/* eslint-disable */
import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import qs from 'qs';
import InstantSearchActions from './components/InstantSearchActions';
import InstantSearchResults from './components/InstantSearchResults';

async function fetchSearchResults(query) {
  const body = {
    q: query,
    resources: {
      type: 'product',
      options: {
        unavailable_products: 'hide',
        fields: 'title,product_type,variants.title',
      },
    },
  };

  const queryString = qs.stringify(body);

  const res = await fetch(
    `${window.Shopify.routes.root}search/suggest.json?${decodeURI(queryString)}`
  );

  const json = await res.json();
  return json;
}

function InstantSearchDropdownApp({ parent, mode }) {
  const [resources, setResources] = useState(null);
  const [query, setQuery] = useState(null);
  const [attachListener, setAttachListener] = useState(false);

  const timeout = useRef();

  const closeDropdown = () => {
    const { controller } = parent.dataset;
    const searchInput = document.getElementById(controller);
    setResources(null);
    setQuery(null);
    parent.classList.add('hide');
    searchInput.value = '';
  };

  const handleFocus = () => setAttachListener(true);

  useEffect(() => {
    searchInput.addEventListener('focus', handleFocus);
    return () => searchInput.removeEventListener('focus', handleFocus);
  }, [parent]);

  if (!attachListener) {
    return;
  }

  useEffect(() => {
    function handleSearchInput(e) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(async () => {
        const { value } = e.target;
        if (value?.length) {
          const { resources: nextResources } = await fetchSearchResults(value);
          setResources(nextResources);
          if(mode === 'mobile') {
            document.querySelector('[data-controller="searchbar--mobile"]').classList.remove('hide');
          } else {
            document.querySelector('[data-controller="desktop"]').classList.remove('hide');
          }
          return setQuery(value);
        }
        setResources(null);
        return setQuery(null);
      }, 500);
    }

    const { controller } = parent.dataset;
    const searchInput = document.getElementById(controller);

    searchInput.addEventListener('input', handleSearchInput);

    return () => searchInput.removeEventListener('input', handleSearchInput);
  }, [parent, attachListener]);

  useEffect(() => {
    if (resources) {
      return parent.classList.remove('hide');
    }
    return parent.classList.add('hide');
  }, [resources, parent]);

  useEffect(() => {
    function handleMobileNavClose(e) {
      if (e.target.dataset.delegate === 'mobilenavclose') {
        closeDropdown();
      }
    }

    if (mode === 'mobile') {
      document.addEventListener('click', handleMobileNavClose);
      return () => document.removeEventListener('click', handleMobileNavClose);
    }
    return null;
  }, [closeDropdown, mode]);

  return (
    <>
      <InstantSearchResults results={resources?.results} mode={mode} />
      {mode === 'mobile' && <InstantSearchActions query={query} closeDropdown={closeDropdown} />}
    </>
  );
}

export default InstantSearchDropdownApp;
