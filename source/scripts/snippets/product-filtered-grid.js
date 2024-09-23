/* eslint-disable func-names */
import supportsIntersectionObserver from 'WINDOW/supportsIntersectionObserver';

const selectors = {
  productFilteredGrid: '.product-filtered-grid__products-wrapper',
  productCount: '.product-filtered-grid__count',
  productGrid: '.product-card-grid-wrapper',
  productCard: '.product-card',
  renderTrigger: '#infinite-scroll-trigger',
  clearance: '.clearance',
};

const parser = new DOMParser();
const productFilteredGrid = document.querySelector(selectors.productFilteredGrid);
const renderTrigger = document.querySelector(selectors.renderTrigger);
const clearance = document.querySelector(selectors.clearance);
const triggerTopPadding = window.innerHeight * 0.75;

let currentPage = 1;
let maxPage = renderTrigger?.getAttribute('data-pages') || 1;
// eslint-disable-next-line no-unused-vars
let isRenderComplete = false;

const fetchHtmlFromUrl = async (url) => {
  const res = await fetch(url);
  const text = await res.text();
  return parser.parseFromString(text, 'text/html');
};

const activateRendering = () => {
  isRenderComplete = false;
  if (renderTrigger) {
    renderTrigger.classList.remove('active');
    renderTrigger.innerHTML = 'Loading products...';
  }
};

const deactivateRendering = () => {
  isRenderComplete = true;
  if (renderTrigger) {
    setTimeout(() => {
      renderTrigger.classList.add('active');
      renderTrigger.innerHTML = 'Looking for more deals?';
      clearance.classList.remove('hide');
    }, 1000);
  }
};

/* Filter Update Render */

const renderFilteredProductGrid = (newDocument) => {
  const productCount = document.querySelector(selectors.productCount);
  const newProductFilteredGrid = newDocument.querySelector(selectors.productFilteredGrid);
  const newProductCount = newDocument.querySelector(selectors.productCount);

  if (productFilteredGrid && newProductFilteredGrid) {
    productFilteredGrid.innerHTML = newProductFilteredGrid.innerHTML;
  }

  if (productCount && newProductCount) {
    productCount.innerHTML = newProductCount.innerHTML;
  }
};

const handleFilterUpdate = async () => {
  // Update page and product data
  const newDocument = await fetchHtmlFromUrl(window.location.href);
  const newTrigger = newDocument?.querySelector(selectors.renderTrigger);
  currentPage = 1;
  maxPage = newTrigger?.getAttribute('data-pages') || 1;
  renderFilteredProductGrid(newDocument);
};

document.addEventListener('filterupdate', handleFilterUpdate);

/* Infinite Scroll Product Render */

const renderNextPage = (nextDocument) => {
  const productGrid = document.querySelector(selectors.productGrid);
  if (productGrid) {
    const nextProductCards = nextDocument.querySelectorAll(selectors.productCard);
    nextProductCards.forEach((card) => {
      productGrid.lastElementChild.insertAdjacentHTML('afterend', card.outerHTML);
    });
  }
};

const handleInfiniteScroll = async () => {
  currentPage += 1;
  // Show looking for more deals and clearance if currentPage >= maxPage
  if (currentPage >= maxPage) {
    renderTrigger.innerHTML = 'Looking for more deals?';
    clearance.classList.remove('hide');
  }

  if (currentPage <= maxPage) {
    // Activate for special cases, such as a filter being applied
    activateRendering();
    // Handle possible filters already present
    const { origin, pathname, search } = window.location;
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', currentPage);
    const nextPage = `${origin + pathname}?${searchParams.toString()}`;
    // Retrieve next page of products (filtered or unfiltered)
    const nextDocument = await fetchHtmlFromUrl(nextPage);
    renderNextPage(nextDocument);
  } else {
    deactivateRendering();
  }
};

// When trigger enters viewport, load some more product cards
if (productFilteredGrid && renderTrigger) {
  if (supportsIntersectionObserver) {
    const observer = new IntersectionObserver(handleInfiniteScroll, {
      rootMargin: `${triggerTopPadding}px 0px 0px 0px`,
      threshold: 0,
    });
    observer.observe(renderTrigger);
  } else {
    // Render all the pages!!
    for (let i = 0; i < maxPage; i += 1) {
      handleInfiniteScroll();
    }
  }
}
