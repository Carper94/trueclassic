/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
// core version + navigation, pagination modules:
import Swiper, { Scrollbar, Navigation } from 'swiper';

const isMobile = window.matchMedia('(max-width: 768px)');
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function handleSizeFilter(e, galleryTop) {
  if (e.target.dataset.delegate === 'sizefilter') {
    const targetSize = e.target.getAttribute('data-size');

    if (targetSize === 'all') {
      resetSlideDisplay(galleryTop);
    } else {
      galleryTop.slides.forEach((slide) => {
        const image = slide.querySelector('img');
        const imageAlt = image.getAttribute('alt').toLowerCase();

        // If the image has no alt text, skip filtering and keep it visible
        if (imageAlt === targetSize) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });

      galleryTop.update(); // Update the Swiper after filtering
    }

    e.target.classList.add('active');
  }
}

function resetSlideDisplay(galleryTop) {
  const filterbuttons = document.querySelectorAll('button.active');
  filterbuttons.forEach((button) => {
    button.classList.remove('active');
  });
  galleryTop.slides.forEach((slide) => {
    slide.style.display = 'block';
  });
}

function initSwiper() {

  const productGallery = document.querySelectorAll('#product-gallery .swiper');
  const desktopGallery = document.querySelectorAll('.swiper.desktop-gallery');
  const disableMobileAutoHeight = document.querySelector('.mobile-gallery').classList.contains('disable-autoheight')
 
  productGallery.forEach((gallery) => {
    if (gallery) {
      const galleryTop = new Swiper(gallery, {
        modules: [Scrollbar, Navigation],
        observer: true,
        observeParents: true,
        autoHeight: !disableMobileAutoHeight,
        navigation: {
          nextEl: '.gallery-button-next',
          prevEl: '.gallery-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });

      document.addEventListener('click', (e) => {
        if (e.target.dataset.delegate === 'sizefilter') {
          resetSlideDisplay(galleryTop);
          handleSizeFilter(e, galleryTop);
        }
      });
      galleryTop.on('slideChange', () => {});
    }
  });

  desktopGallery.forEach((gallery) => {
    if (gallery) {
      const galleryTop = new Swiper(gallery, {
        modules: [Scrollbar, Navigation],
        observer: true,
        observeParents: true,
        autoHeight: true,
        navigation: {
          nextEl: '.gallery-button-next',
          prevEl: '.gallery-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });

      document.addEventListener('click', (e) => {
        if (e.target.dataset.delegate === 'sizefilter') {
          resetSlideDisplay(galleryTop);
          handleSizeFilter(e, galleryTop);
        }
      });
      galleryTop.on('slideChange', () => {});
    }
  });
}

initSwiper();

function viewportChange(event) {
  if (!isMobile) return null;

  if (event.matches) {
    initSwiper();
  }
  return null;
}

if (isMobile.matches) {
  isMobile.addEventListener('change', viewportChange);
}

if (isReducedMotion.matches) {
  const videos = document.querySelectorAll('.product-gallery video');
  videos.forEach((video) => {
    video.pause();
    video.removeAttribute('autoplay');
  });
}

function handleVideoClick(e) {
  if (e.target.dataset.delegate === 'videoplaypause') {
    if (e.target.paused) {
      return e.target.play();
    }
    return e.target.pause();
  }
  return false;
}

function handleFilterClick(e) {
  if (e.target.dataset.delegate === 'desktopsizefilter') {
    const targetSize = e.target.getAttribute('data-size');
    const slide = document.querySelectorAll('.product-list-gallery .swiper-slide');
    const filterbuttons = document.querySelectorAll('.product-main-gallery button.active');

    filterbuttons.forEach((button) => {
      button.classList.remove('active');
      e.target.classList.add('active');
    });

    slide.forEach((slide) => {
      if (targetSize === 'all') {
        slide.style.display = 'block';
      } else {
        const altText = slide.getAttribute('data-alt-size').toLowerCase();
        if (altText === targetSize) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      }
    });
  }
}

function handleModelToggle(e) {
  if (e.target.dataset.delegate === 'modeltoggle') {
    const filterbuttons = document.querySelectorAll('.product-size-filter button');

    filterbuttons.forEach((button) => {
      if (button.classList.contains('inactive')) {
        button.classList.remove('inactive');
      } else if (!button.classList.contains('active')) {
        button.classList.add('inactive');
      }
    });
  }
}

document.addEventListener('click', handleModelToggle);
document.addEventListener('click', handleVideoClick);
document.addEventListener('click', handleFilterClick);

export default initSwiper;