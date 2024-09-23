/* eslint-disable prettier/prettier */
import Swiper, { Navigation, EffectFade } from 'swiper';

// eslint-disable-next-line consistent-return
const iconSlider = (selector) => {
  const iconRows = document.querySelectorAll(selector);

  if (!iconRows.length) return null;

  iconRows.forEach((iconRow) => {
    const s = iconRow.querySelector('.swiper-main');
    const rs = iconRow.querySelector('.swiper-rotating');
    const {
      autoplay,
      autoplaySpeed,
      mobileSlidesPerView,
      desktopSlidesPerView,
      loopDesktop,
      loopMobile,
    } = s.dataset;

    function initSwiper() {
      let loop = loopMobile === 'true';
      let slidesPerView = parseInt(mobileSlidesPerView, 10);
      let draggable = true;
      if (window.innerWidth > 767) {
        loop = loopDesktop === 'true';
        slidesPerView = parseInt(desktopSlidesPerView, 10);
        draggable = false;
      }

      const rotatingSwiper = rs
        ? new Swiper(rs, {
            direction: 'horizontal',
            loop: false,
            slidesPerView: 1,
            autoplay: autoplay === 'true' ? { delay: autoplaySpeed } : false,
            modules: [EffectFade],
            effect: 'fade',
            fadeEffect: {
              crossFade: true,
            },
          })
        : null;

      const swiperConfig = {
        direction: 'horizontal',
        loop,
        slidesPerView,
        draggable,
        autoplay: autoplay === 'true' ? { delay: autoplaySpeed } : false,
        centerInsufficientSlides: true,
        spaceBetween: 10,
        modules: [Navigation],
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };

      const swiper = new Swiper(s, swiperConfig);

      if (rotatingSwiper) {
        if (window.innerWidth > 767) {
          rotatingSwiper.on('slideChange', () => {
            const index = rotatingSwiper.activeIndex + 1;
            const activeSlides = document.querySelectorAll('.quotes-swiper .swiper-slide');

            for (let i = 0; i < activeSlides.length; i += 1) {
              activeSlides[i].classList.remove('inactive-slide');
            }

            const inactiveSlides = document.querySelectorAll(
              `.quotes-swiper .swiper-slide:not(:nth-of-type(${index}))`
            );

            for (let i = 0; i < inactiveSlides.length; i += 1) {
              inactiveSlides[i].classList.add('inactive-slide');
            }
          });
        }
        ['slideChange', 'autoplay'].forEach((swiperEvent) =>
          swiper.on(swiperEvent, (e) => {
            if (window.innerWidth < 768) {
              const { realIndex } = e;
              rotatingSwiper.slideTo(realIndex);
            }
          })
        );
      }
      return swiper;
    }

    let swiper = initSwiper();

    let timeout;
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        swiper.destroy();
        swiper = initSwiper();
      }, 100);
    });
  });
};

iconSlider('.tc-icon-row');
iconSlider('.icon-row:not(.static-row)');
