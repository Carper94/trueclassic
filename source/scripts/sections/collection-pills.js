// core version + navigation, pagination modules:
/* eslint-disable func-names */
/* eslint-disable object-shorthand */

import Swiper, { Navigation, Mousewheel } from 'swiper';

const swiper = new Swiper('.collection-pills-slider .swiper', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 'auto',
  spaceBetween: 10,
  modules: [Navigation, Mousewheel],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  mousewheel: {
    sensitivity: 100,
  },
  on: {
    init: function () {
      const nextArrow = document.querySelector('.collection-pill-container .swiper-button-next');
      const prevArrow = document.querySelector('.collection-pill-container .swiper-button-prev');
      nextArrow.style.display = 'flex';
      prevArrow.style.display = 'flex';
    },
  },
});

function handleFocus(e, i) {
  swiper.slideTo(i);
}

// set slides as active on focus
const slides = document.querySelectorAll('.collection-pills-slider .swiper-slide');
slides.forEach((slide, i) => slide.addEventListener('focusin', (e) => handleFocus(e, i)));
