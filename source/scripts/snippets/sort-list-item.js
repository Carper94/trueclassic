// very annoying, but shopify has no way of knowing whether a sort_by option is selected

const params = new URLSearchParams(window.location.search);
const sortByValue = params.get('sort_by');
if (sortByValue) {
  const sortByInput = document.querySelector(`input[id="sort_by-${sortByValue}"]`);
  if (sortByInput) sortByInput.setAttribute('checked', true);
}
