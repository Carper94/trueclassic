/**
 * Scripts in this file will be added to the site via theme.liquid layout (found inside the dist/layout directory) using the asset-router-js.liquid snippet )
 * for more info on theme layouts see: https://shopify.dev/tutorials/develop-theme-layouts
 *
 * Compiles to ./dist/assets/scripts/layout.theme.js
 */

/* eslint-disable no-unused-vars */

/* **** Note **** strictly coupled template scripts should not be imported here. They are
are added conditionallly via the asset-router-js.liquid file. This helps keep the code more lean  */

// Import ES6 modules (recommended)
import { h, render } from 'preact';

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'what-input';

import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';

import '../polyfill/event-submitter';
import 'UTILS/responsive-background-images';
import '../utilities/vimeoPlayer';

import 'COMPONENTS/mediaCard';
import 'ACCESSIBILITY/focusFormErrors';

import '../utilities/country-selector';
import '../utilities/membership';
import '../utilities/klaviyo-form';
import '../utilities/klaviyo';
import '../snippets/category-slider';
import '../snippets/announcement-bar';
import '../snippets/featured-collections';
import '../snippets/accordion';
import '../snippets/accordion-products';
import '../snippets/nav-panel';
import '../snippets/filter-drawer';
import '../snippets/sort-drawer';
import '../snippets/product-filtered-grid';
import '../snippets/image-slider';
import '../snippets/captcha';
import '../snippets/related-posts-slider';
import '../snippets/pagination';
import '../snippets/fit-finder';
import '../snippets/product-size-guide';
import '../snippets/lazyload';
import '../snippets/tooltip';

import '../sections/mini-cart';
import '../sections/mobile-nav';
import '../sections/contact-info';
import '../sections/collection-pills';
import '../snippets/sort-list-item';
import '../snippets/testimonial-slider';
import '../snippets/discount-pack-list-item-form';
import '../snippets/product-card';
import '../snippets/affiliate-image-slider';
import '../snippets/weekly-timer';
import '../snippets/product-rebuy-carousel';
// import '../snippets/product-custom-giftcard';

import '../sections/icon-row';
import '../sections/quiz-option';
import '../sections/section-featured-collections';
import '../sections/image-card-grid';
import '../sections/image-banner';
import '../sections/tc-slider';

import '../snippets/instant-search-dropdown';
import '../snippets/mega-menu';

import '../endrock/endrock-ab-testing-collection-cards';

import PackBuilderApp from '../react/PackBuilderApp';

// axe audit
// TODO disable in production
import 'UTILITIES/accessibility/axe';

// Initialize Header & Nav Controllers
// headerController.init();
// navController.init();
// Common a11y fixes
focusHash();
bindInPageLinks();

// render global packbuilder app
render(<PackBuilderApp />, document.body);

// Apply a specific class to the html element for browser support of cookies.
// if (cookiesEnabled()) {
//   document.documentElement.className = document.documentElement.className.replace(
//     'supports-no-cookies',
//     'supports-cookies',
//   );
// }
