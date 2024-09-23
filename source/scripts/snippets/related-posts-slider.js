// core version
import Swiper from 'swiper';

(() => {
  const relatedPost = document.querySelector('.related-posts-slider .swiper');

  // Early return if relatedPost doesn't exist
  if (!relatedPost) return null;

  const swiper = new Swiper(relatedPost, {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 'auto',
  });

  return swiper;
})();
