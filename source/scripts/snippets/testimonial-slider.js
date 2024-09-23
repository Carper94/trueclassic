// core version + navigation, Ally modules:
import Swiper, { Navigation } from 'swiper';

const testimonialSlider = (selector) => {
  const testimonial = document.querySelector(selector);

  // Early return if testimonial doesn't exist
  if (!testimonial) return null;

  const prevEl = testimonial.querySelector('.testimonial-button-prev');
  const nextEl = testimonial.querySelector('.testimonial-button-next');

  const swiper = new Swiper(testimonial, {
    // configure Swiper to use modules
    modules: [Navigation],
    // Optional parameters
    loop: false,
    slidesPerView: 1,

    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
    },

    navigation: {
      prevEl,
      nextEl,
    },
  });

  return swiper;
};

testimonialSlider('.testimonial-slider .swiper');
testimonialSlider('.testimonial-slider-navigation .swiper');

export default testimonialSlider;
