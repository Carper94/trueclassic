// core version + navigation, pagination modules:
import Swiper, { Scrollbar } from 'swiper';

const swiper = new Swiper('.category-slider .swiper', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 'auto',
  spaceBetween: 10,
  modules: [Scrollbar],
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
});

function handleFocus(e, i) {
  swiper.slideTo(i);
}

// set slides as active on focus
const slides = document.querySelectorAll('.category-slider .swiper-slide');
slides.forEach((slide, i) => slide.addEventListener('focusin', (e) => handleFocus(e, i)));
