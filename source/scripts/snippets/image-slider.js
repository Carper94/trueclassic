// core version + navigation, Pagination modules:
import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

const initSlider = (element) => {
  const slider = element.querySelector('.image-slider .swiper');

  // Early return if target slider element doesn't exist
  if (!slider) return null;

  const prevEl = element.querySelector('.image-slider-button-prev');
  const nextEl = element.querySelector('.image-slider-button-next');

  const swiper = new Swiper(slider, {
    modules: [Navigation, Pagination, Scrollbar],
    // Optional parameters
    loop: false,
    spaceBetween: 20,
    slidesPerView: 1.5,
    // autoplay: {
    //   delay: 3000,
    // },

    breakpoints: {
      768: {
        slidesPerView: 4,
      },
    },

    scrollbar: {
      el: '.swiper-scrollbar',
    },

    navigation: {
      prevEl,
      nextEl,
    },
  });

  return swiper;
};

const imageSliderWrappers = document.querySelectorAll('.image-slider-wrapper');

if (imageSliderWrappers.length) {
  imageSliderWrappers.forEach((imageSliderWrapper) => initSlider(imageSliderWrapper));
}
