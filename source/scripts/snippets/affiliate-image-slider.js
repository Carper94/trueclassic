// core version + navigation, pagination modules:
import Swiper from 'swiper';

const swiper = new Swiper('.affiliate-swiper-container', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 3,
  spaceBetween: 10,
  breakpoints: {
    1920: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1028: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  },
});

function handleFocus(e, i) {
  swiper.slideTo(i);
}

// set slides as active on focus
const slides = document.querySelectorAll('.affiliate-swiper-container .swiper-slide');
slides.forEach((slide, i) => slide.addEventListener('focusin', (e) => handleFocus(e, i)));
