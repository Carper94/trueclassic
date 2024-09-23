/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
// core version + navigation, Ally modules:
import Swiper, { Navigation, Keyboard, Autoplay } from 'swiper';

Swiper.use([Autoplay]);

const settings = (() => {
  try {
    const settingsEl = document.querySelector('#header-section-settings');
    return JSON.parse(settingsEl.innerHTML);
  } catch (error) {
    return null;
  }
})();

// checks for JSON settings and if they exist, sets the autoplay speed
const announcementDelay = settings ? settings.announcement_bar_duration * 1000 : 5000;

const announcementBar = document.querySelector('#announcement-bar-1 .swiper');

if (announcementBar) {
  const swiper = new Swiper(announcementBar, {
    modules: [Navigation, Keyboard],
    direction: 'horizontal',
    loop: true,
    disabledOnInteraction: true,
    pauseOnMouseEnter: true,
    autoplay: {
      delay: announcementDelay,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!mediaQuery || mediaQuery.matches) {
    swiper.autoplay.stop();
  }

  mediaQuery.addEventListener('change', () => {
    if (mediaQuery.matches) {
      swiper.autoplay.stop();
    }
  });
}

// Dynamic Announcement Bar

const testGwpAdded = sessionStorage.getItem('test-gwp-added');
const testGwp = sessionStorage.getItem('test-gwp');
const testGwpPopupClosed = sessionStorage.getItem('test-gwp-popup-closed');

function initAnnoucementBar(annoucementBarSelector) {
  const annoucementBar = annoucementBarSelector;
  const discountInfo = annoucementBar.querySelector('.anouncement__button-info');
  const discountClose = annoucementBar.querySelector('.anouncement__button-close');
  const tooltip = annoucementBar.querySelector('.announcement__tooltip');

  if (discountClose) {
    discountClose.addEventListener('click', () => {
      annoucementBar.style.display = 'none';
    });
  }

  if (discountInfo) {
    const toggleTooltip = (display) => {
      tooltip.style.display = display;
    };

    discountInfo.addEventListener('mouseover', () => toggleTooltip('block'));
    discountInfo.addEventListener('mouseout', () => toggleTooltip('none'));
    discountInfo.addEventListener('touchstart', () => toggleTooltip('block'));
    discountInfo.addEventListener('touchend', () => toggleTooltip('none'));
  }
}

const annoucementBars = document.querySelectorAll('[class*="announcement-bar__"]');
if (annoucementBars.length) {
  annoucementBars.forEach(initAnnoucementBar);
}

function extractValues(text, defaultDiscountType) {
  if (!text) return null;

  const regex = /(\d+)(\D*)/;
  const match = text.match(regex);

  return match
    ? {
      discountAmount: parseInt(match[1], 10),
      discountType: match[2] || defaultDiscountType,
    }
    : null;
}

function getUrlParameters(url) {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const paramMap = {};

  for (const [key, value] of params.entries()) {
    paramMap[key] = value;
  }

  return paramMap;
}

function getPromoBarElement(paramMap) {
  return Object.keys(paramMap).reduce((acc, key) => {
    const element = document.querySelector(`.announcement-bar__${key}`);
    return element || acc;
  }, null);
}

const urlParameters = getUrlParameters(window.location);

if (urlParameters.amount || urlParameters.cashback || urlParameters.gwp) {
  const _fd = urlParameters._fd || undefined;
  const amountText = urlParameters.amount || undefined;
  const amountCashback = urlParameters.cashback || undefined;
  const isGWP = urlParameters.gwp || undefined;
  const pb = urlParameters.pb;
  const utmMedium = urlParameters.utm_medium || '';
  const utmSource = urlParameters.utm_source || '';

  let extractedValues = '';
  if (amountCashback !== undefined) {
    extractedValues = extractValues(amountCashback, 'percent');
  } else if (amountText !== undefined) {
    extractedValues = extractValues(amountText, 'percent');
  } else if (isGWP !== undefined) {
    extractedValues = extractValues(isGWP, 'free gift with purchase');
  }

  if (extractedValues) {
    const { discountAmount, discountType } = extractedValues;
    // eslint-disable-next-line no-nested-ternary
    let discountFrom = '';

    if (utmMedium !== '' || utmSource !== '') {
      const discountSource = utmMedium.replace(/\+/g, ' ');
      discountFrom = `from ${discountSource}`;
    }

    const cleanUtmSource = utmSource.toLowerCase().trim().replace('+', ' ');

    if (cleanUtmSource === 'joe rogan' ||
      cleanUtmSource === 'raymond' ||
      cleanUtmSource === 'jon' ||
      cleanUtmSource === 'michaelj' ||
      cleanUtmSource === 'jonathanb' ||
      cleanUtmSource === 'brennanashley' ||
      cleanUtmSource === 'jordank' ||
      cleanUtmSource === 'christiang' ||
      cleanUtmSource === 'krisb' ||
      cleanUtmSource === 'matthewh' ||
      cleanUtmSource === 'ashevan' ||
      cleanUtmSource === 'scottm' ||
      cleanUtmSource === 'richardh' ||
      cleanUtmSource === 'joelf' ||
      cleanUtmSource === 'christopherk' ||
      cleanUtmSource === 'paulc' ||
      cleanUtmSource === 'jeremyc' ||
      cleanUtmSource === 'scottys') {

      sessionStorage.setItem('test-gwp', 1);
      sessionStorage.setItem('test-gwp-name', cleanUtmSource);
      const valueFrom = sessionStorage.getItem('test-gwp-name');

      const promoBar = getPromoBarElement(urlParameters);
      window.location.href = '/collections/crew-neck-tees';

      if (promoBar) {
        promoBar.style.zIndex = '102';
        promoBar.classList.remove('hide');
        const promoBarTitle = promoBar.querySelector('.announcement__tooltip-notice') || promoBar.querySelector('p');
        promoBarTitle.innerHTML = `GET A FREE GIFT WITH PURCHASE FROM ${valueFrom}.`;
        promoBarTitle.style.textTransform = 'uppercase';
      }

    } else {

      const promoBar = getPromoBarElement(urlParameters);

      if (promoBar) {
        promoBar.style.zIndex = '102';
        promoBar.classList.remove('hide');
        const promoBarTitle = promoBar.querySelector('.announcement__tooltip-notice') || promoBar.querySelector('p');
        if (amountCashback !== undefined) {
          promoBarTitle.innerHTML = `<b>${discountAmount}% cashback</b> applied your order`;
        } else if (amountText !== undefined) {
          promoBarTitle.innerHTML = `Your discount of <b>${discountAmount}% off</b> ${discountFrom} will be applied at checkout`;
        }
      }
    }
  }
}

// GWP Test
if (document.querySelector('.announcement-bar__gwp')) {
  const annoucementBarLP = document.querySelector(`.announcement-bar__gwp`);
  if (window.location.href.includes('/collections/sale')) {
    sessionStorage.setItem('test-gwp', 1);
    sessionStorage.removeItem('test-gwp-name');
    annoucementBarLP.style.zIndex = '102';
    annoucementBarLP.classList.remove('hide');
    sessionStorage.removeItem('test-gwp-popup-closed');
  }

  if (testGwp) {
    annoucementBarLP.style.zIndex = '102';
    annoucementBarLP.classList.remove('hide');
    const valueFrom = sessionStorage.getItem('test-gwp-name');

    annoucementBarLP.style.zIndex = '102';
    annoucementBarLP.classList.remove('hide');
    const annoucementBarLPTitle = annoucementBarLP.querySelector('.announcement__tooltip-notice') || annoucementBarLP.querySelector('p');
    if (valueFrom) {
      annoucementBarLPTitle.innerHTML = `FREE GIFT WITH PURCHASE FROM ${valueFrom}.`;
    } else {
      annoucementBarLPTitle.innerHTML = `FREE BEANIE WITH PURCHASE of $99 or more.`;
    }
    annoucementBarLPTitle.style.textTransform = 'uppercase';
  }
}