/* eslint-disable no-inner-declarations */
import Swiper, { Scrollbar } from 'swiper';

if (window.innerWidth < 768) {
  const swiper = new Swiper('.image-card-grid.swiper', {
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
  const slides = document.querySelectorAll('.image-card-grid .swiper-slide');
  slides.forEach((slide, i) => slide.addEventListener('focusin', (e) => handleFocus(e, i)));
}
