const selectors = {
  productMainForm: '.product-main-form',
  sectionFeaturedCollections: '.featured-collections',
  recentlyViewedTab: '.featured-collections__tab[data-recently-viewed]',
  recentlyViewedPanel: '.featured-collections__panel[data-recently-viewed]',
};

function getProductData() {
  const product = JSON.parse(
    document.querySelector(`${selectors.productMainForm} [data-product-json]`).textContent
  );
  return product;
}

function getData() {
  try {
    const products = localStorage.getItem('recently-viewed');
    if (products) return JSON.parse(products);
    return [];
  } catch (error) {
    return [];
  }
}

function setData(product) {
  const { handle } = product;
  const products = getData();

  // remove instances of current product from array
  const filteredProducts = products.filter((p) => p.handle !== handle);

  try {
    if (filteredProducts.length >= 5) {
      // remove first item from array and trim to 4 items
      const nextProducts = filteredProducts.slice(1, 6);

      // add the current product to end of array
      nextProducts.push({ handle });
      return localStorage.setItem('recently-viewed', JSON.stringify(nextProducts));
    }

    // for less than 4 products other than current product
    const nextProducts = [...filteredProducts];

    // add the current product to end of array
    nextProducts.push({ handle });
    return localStorage.setItem('recently-viewed', JSON.stringify(nextProducts));
  } catch (error) {
    return localStorage.setItem('recently-viewed', JSON.stringify([]));
  }
}

// use sections API to request single product card for each product
function createRequests(products, currentProduct) {
  return products
    .filter((p) => p.handle !== currentProduct.handle)
    .map((p) => {
      return fetch(
        `${window.Shopify.routes.root}products/${p.handle}?sections=section-product-card`
      );
    });
}

// track recently viewed products
(async function recentlyViewed() {
  let currentProduct;

  if (window.location.pathname.match(/\/products\/.*/)) {
    currentProduct = getProductData();
    setData(currentProduct);
  }

  const products = getData();

  const sectionFeaturedCollections = document.querySelector(selectors.sectionFeaturedCollections);

  if (sectionFeaturedCollections) {
    const panel = sectionFeaturedCollections.querySelector(selectors.recentlyViewedPanel);
    const tab = sectionFeaturedCollections.querySelector(selectors.recentlyViewedTab);

    const { showRecentlyViewed } = sectionFeaturedCollections.dataset;

    if (showRecentlyViewed && panel && tab) {
      // create array of requests for product cards
      const reqs = createRequests(products, currentProduct);
      if (!reqs.length) {
        tab.classList.add('hide');
        return null;
      }

      try {
        // send all card requests
        const responses = await Promise.all(reqs);

        // get all markup from responses
        const sections = await Promise.all(
          responses
            .map(async (res) => {
              const json = await res.json();
              return json['section-product-card'];
            })
            .filter((item) => item)
        );

        if (!sections.length) return null;

        // add markup to product card grid
        const grid = panel.querySelector('.product-card-grid-wrapper');
        grid.innerHTML = sections.join('');
        // undhide tab and panel
        [panel, tab].forEach((el) => el.classList.remove('hide'));
      } catch (error) {
        // fail silently
        return null;
      }
    }
  }
  return null;
})();
