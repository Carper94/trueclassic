import Swiper, { Pagination, Navigation } from 'swiper';

// Function to handle lazy-loaded elements
function handleLazyLoad(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyElement = entry.target;

      // Check if the lazy element has a specific data-src attribute
      const productId = lazyElement.getAttribute('data-id');

      // Check if the lazy element has already been processed
      const isProcessed = lazyElement.getAttribute('data-processed');

      if (productId && !isProcessed) {
        // eslint-disable-next-line no-unused-vars
        const swiper = new Swiper(`.swiper-${productId}`, {
          modules: [Pagination, Navigation],
          pagination: {
            el: `.swiper-pagination-${productId}`,
            clickable: true,
          },
          navigation: {
            nextEl: `.swiper-button-next.swiper-button-next-${productId}`,
            prevEl: `.swiper-button-prev.swiper-button-prev-${productId}`,
          },
        });

        // Mark the element as processed to avoid duplicate processing
        lazyElement.setAttribute('data-processed', 'true');
      }

      // Stop observing this element once it's loaded
      observer.unobserve(lazyElement);
    }
  });
}

// Create an Intersection Observer
const lazyLoadObserver = new IntersectionObserver(handleLazyLoad, {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 0.5, // When 50% of the element is visible
});

function observeNewLazyElements() {
  // Get all elements with the "lazy-load" class
  const lazyLoadElements = document.querySelectorAll('.product-card');

  // Start observing each lazy-loaded element
  lazyLoadElements.forEach((element) => {
    lazyLoadObserver.observe(element);
  });
}

// Initial observation of elements present on page load
observeNewLazyElements();

// Detect new lazy-loaded elements when scrolling
window.addEventListener('scroll', () => {
  observeNewLazyElements();
});
