const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;

      if (!img.src && img.dataset.src) {
        img.src = img.dataset.src;
      }

      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }

      if (img.dataset.sizes) {
        img.sizes = img.dataset.sizes;
      }
      img.addEventListener('load', () => {
        img.classList.add('is-loaded');
        img.classList.remove('is-lazy');
        img.parentElement.parentElement.classList.remove('lazy-image-placeholder');
        img.parentElement.classList.remove('lazy-image-placeholder');

        delete img.dataset.src;
        delete img.dataset.srcset;
        delete img.dataset.sizes;

        observer.unobserve(img);
      });

      img.classList.add('is-lazy');

      observer.observe(img);
    }
  });
});

const images = document.querySelectorAll('.lazy-image');
images.forEach((img) => observer.observe(img));
