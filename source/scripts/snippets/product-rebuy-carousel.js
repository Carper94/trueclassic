/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-dupe-keys */
// core version + navigation, Ally modules:
import Swiper, { Navigation, Scrollbar } from 'swiper';

const rebuySlider = (selector) => {
  const rebuyslider = document.querySelector(selector);

  if (!rebuyslider) return null;

  const prevEl = rebuyslider.querySelector('.rebuy-button-prev');
  const nextEl = rebuyslider.querySelector('.rebuy-button-next');
  const scrollbar = rebuyslider.querySelector('.rebuy-swiper .swiper-scrollbar');

  const swiper = new Swiper(rebuyslider, {
    modules: [Navigation, Scrollbar],
    loop: false,
    slidesPerView: 'auto',
    loopedSlides: 4,
    spaceBetween: 20,
    freeMode: false,
    lazy: true,
    lazy: {
      loadPrevNext: true,
    },
    a11y: true,
    breakpoints: {
      320: {
        slidesPerView: 1.5,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
    scrollbar: {
      el: scrollbar,
    },
    navigation: {
      nextEl: nextEl,
      prevEl: prevEl,
    },
    on: {
      init() {
        const container = document.querySelector('#collections-rebuy');
        container.classList.remove('collection-hidden');
      },
    },
  });

  return swiper.update();
};

document.addEventListener('rebuy.ready', function (event) {
  rebuySlider('.rebuy-swiper');
});

export default rebuySlider;
