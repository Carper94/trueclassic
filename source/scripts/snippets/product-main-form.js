/* eslint-disable camelcase */
/* eslint-disable one-var */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable */
import shopifyClient from 'UTILS/shopify-client';
import { getUrlWithVariant } from '@shopify/theme-product-form';
import { getCurrentVariantId, getVariant, getCurrentPackVariantId } from 'UTILITIES/product-form';
import sizeText from 'UTILITIES/sizeText';
import formatter from 'UTILS/currency/formatter';
import initSwiper from 'SNIPPETS/product-gallery';
import initAccordions from 'SNIPPETS/accordion-products';
import { setSizeGuideListeners } from 'SNIPPETS/product-size-guide';

function setHistoryState(url) {
  window.history.replaceState({ path: url }, '', url);
}

function setSizeDisplay() {
  const sizeButtons = document.querySelectorAll('.size-swatch__input-wrapper input[type="radio"]');
  if (sizeButtons.length) {
    sizeButtons.forEach((input) => {
      const sizeLegend = input.parentNode.parentNode.querySelector('.size-swatch .size-legend');

      if (input.checked) {
        const size = sizeText(input.value);
        sizeLegend.innerText = `\u00A0${size}`;
      }
    });
  }
}

const selectors = {
  productMainForm: '.product-main-form',
};

const availability = (() => {
  try {
    const el = document.getElementById('data-product-available');
    return JSON.parse(el.textContent);
  } catch (error) {
    console.error(error);
    return null;
  }
})();

function getProductData() {
  return JSON.parse(
    document.querySelector(`${selectors.productMainForm} [data-product-json]`).textContent
  );
}

async function fetchProductData(handle) {
  let res;
  try {
    res = await fetch(`/products/${handle}.json`);
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, res };
  }
}

async function fetchProductCategories(handle) {
  let res;
  try {
    res = await fetch(`/products/${handle}.json`);
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, res };
  }
}

(async function () {
  const productForm = document.querySelector('.product-main-form');
  const handleThreePack = productForm.dataset.threepackHandle;
  const handleSixPack = productForm.dataset.sixpackHandle;
  const hasPackOption = !!(handleThreePack || handleSixPack);
  const subFrequency = document.querySelector('.rtx-subscription-dropdown');
  const subscriptionLabel = document.querySelector('label[for="purchaseTypeSubscription"]');
  let threePackProduct = null;
  let sixPackProduct = null;

  // selectSizeSwatch();

  // product query
  const product = getProductData();

  // pack query
  if (hasPackOption) {
    if (handleThreePack) {
      const { data } = await fetchProductData(handleThreePack);
      threePackProduct = data?.product;
    }
    if (handleSixPack) {
      const { data } = await fetchProductData(handleSixPack);
      sixPackProduct = data?.product;
    }
  }

  function handleError({ res, error }) {
    const errorTarget = document.querySelector('.product-main-form__error span');
    if (res?.ok && error.description) {
      errorTarget.innerText = error.description;
      return true;
    }
    errorTarget.innerText = 'There was a problem adding to cart.';
    return true;
  }

  async function handleProductFormSubmit(e) {
    const submitterId = e.submitter.id;

    try {
      e.preventDefault();

      const formData = new FormData(document.querySelector('.product-main-form'));
      const DOMProduct = getProductData();
      // if only one variant, use default variant
      const variantId = getCurrentVariantId({ formData, product: DOMProduct });
      let id = null;
      let quantity = 1;

      // CUSTOM AMOUNT GIFT CARD
      const customAmount = formData.get('properties[_customAmount]');

      const properties = {
        _customAmount: customAmount,
      };

      // STAY AI SELLING PLAN LOGIC
      let selling_plan;
      const selectedPlan = document.querySelector('.rtx-subscription-label.is-selected');
      if (selectedPlan) {
        const selectedPlanType = selectedPlan.querySelector('input').getAttribute('value');
        if (selectedPlanType == 'purchaseTypeSubscription') {
          selling_plan = document.querySelector('[name="selling_plan"]').value;
        }
      } else {
        selling_plan = null;
      }

      if (submitterId !== 'add-to-cart' && hasPackOption) {
        // Pack product details
        const currentVariant = getVariant({ variantId, product: DOMProduct });
        if (submitterId === 'add-3pack-to-cart' && threePackProduct) {
          id = getCurrentPackVariantId(threePackProduct, currentVariant);
        } else if (submitterId === 'add-6pack-to-cart' && sixPackProduct) {
          id = getCurrentPackVariantId(sixPackProduct, currentVariant);
        }
      } else {
        // Standard product details
        id = variantId;
        quantity = parseInt(formData.get('quantity'), 10);
      }

      if (id) {
        // const { success, res, error } = await shopifyClient.add({ id, quantity });
        const { success, res, error } = await shopifyClient.add({
          id,
          quantity,
          properties,
          selling_plan,
        });

        if (!success) {
          return handleError({ res, error });
        }

        if (success) {
          // dispatch event to be handled by ajax cart
          return document.dispatchEvent(new Event('cartaddsuccess'));
        }
      }

      throw new Error('There was a problem adding to cart');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return handleError({ error });
    }
  }

  function setButtonStates({ available }) {
    const addToCartButtons = document.querySelectorAll('.atc-button:not(.gwbutton)');
    const klaviyoButton = document.querySelector('.sr-bis-btn');
    const quantitySelector = document.querySelector('.product-main-form__quantity-wrapper select');
    const quantityChevron = document.querySelector('.quantity-chevron');

    if (!available) {
      quantitySelector.setAttribute('disabled', '');
      quantityChevron.classList.add('disabled');
      klaviyoButton.removeAttribute('disabled');
      klaviyoButton.style.display = 'block';
      addToCartButtons.forEach((button) => {
        button.setAttribute('disabled', '');
      });
    } else {
      quantitySelector.removeAttribute('disabled');
      quantityChevron.classList.remove('disabled');
      klaviyoButton.setAttribute('disabled', '');
      klaviyoButton.style.display = 'none';
      addToCartButtons.forEach((button) => {
        button.removeAttribute('disabled');
      });
    }
  }

  // function formatCurrency(value) {
  //   let currencySymbol;
  //   if (window.theme.moneyCode === 'US') {
  //     currencySymbol = `${window.theme.moneySymbolUs}${formatter.format(value / 100)}`;
  //   } else if (window.theme.moneyCode === 'GB') {
  //     currencySymbol = `${window.theme.moneySymbolUs}${formatter.format(value / 100)}`;
  //   } else if (window.theme.moneySymbolUs === '€') {
  //     currencySymbol = `${window.theme.moneySymbolUs}${formatter.format(value / 100)}`;
  //   } else {
  //     currencySymbol = `${window.theme.moneyCode}
  //     ${window.theme.moneySymbolUs}${formatter.format(value / 100)}`;
  //   }
  //   return currencySymbol;
  // }

  var Shopify = Shopify || {};

  Shopify.money_format = "${{amount}}";
  Shopify.formatMoney = function(cents, format) {
    if (typeof cents == 'string') { cents = cents.replace('.',''); }
    let value = '';
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = (format || this.money_format);

    function defaultOption(opt, def) {
      return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ',');
      decimal   = defaultOption(decimal, '.');

      if (isNaN(number) || number == null) { return 0; }

      number = (number/100.0).toFixed(precision);

      const parts   = number.split('.'),
          dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
          cents   = parts[1] ? (decimal + parts[1]) : '';

      return dollars + cents;
    }

    if(formatString.match(placeholderRegex)[1]) {
      value = formatWithDelimiters(cents, 2);
    }

    return formatString.replace(placeholderRegex, value);
  };

  function setPriceDisplay({ variant }, price, comparePrice, priceNoCurrency, comparePriceNoCurrency) {
    const priceDisplayElement = document.querySelector('[data-main-product-price]');

    // console.log('price', price);
    // console.log('comparePrice', comparePrice);
    // console.log('variant price', variant.price/100);
    // console.log('variant comparePrice', variant.compare_at_price/100);

    // reg will be used to keep spacing between currency symbol & amount for some currencies
    const reg = /[^0-9\,](?=[0-9])/g

    let currency_price = price.replace(reg, '$& ');
    let currency_compare_price = comparePrice.replace(reg, '$& ');

    // console.log('variant.price', (variant.price/100).toFixed(2));
    // console.log('variant.compare_at_price', (variant.compare_at_price/100).toFixed(2));

    // console.log('currency_price before', currency_price);
    // console.log('currency_compare_price before', currency_compare_price);

    currency_price = price.replace(priceNoCurrency, '{{amount}}')
    currency_compare_price = comparePrice.replace(comparePriceNoCurrency, '{{amount}}')

    // console.log('currency_price', currency_price);
    // console.log('currency_compare_price', currency_compare_price);

    const priceIdElement = document
      .querySelector('[data-product-id]')
      .getAttribute('data-product-id');

    const priceVariantId = variant.id;
    let percentageOff = null;
    if (priceDisplayElement.querySelector('[data-percentage-off]')) {
      percentageOff = priceDisplayElement
        .querySelector('[data-percentage-off]')
        .getAttribute('data-percentage-off');

        // percentageOff returns string null at time rather than null object
        if(percentageOff === null) {
          percentageOff = null
        }
    }

    let packSavings = null;
    if (priceDisplayElement.querySelector('[data-pack-savings]')) {
      packSavings = priceDisplayElement
        .querySelector('[data-pack-savings]')
        .getAttribute('data-pack-savings');
    }

    // packSavings returns string 'true' and it will not work with the conditions
    if (packSavings != null) {
      packSavings = true
    }

    let packSavingsSale = null;
    if (priceDisplayElement.querySelector('[data-custom-sale-badge]')) {
      packSavingsSale = priceDisplayElement
        .querySelector('[data-custom-sale-badge]')
        .getAttribute('data-custom-sale-badge');
    }

    let priceDisplay;
    let discountPercentage = null;
    if (variant.compare_at_price && variant.compare_at_price > variant.price) {
      discountPercentage =
        ((variant.compare_at_price - variant.price) / variant.compare_at_price) * 100;
    }

    // Check if the variant has a comparison price and if that comparison price is greater than its actual price
    if (variant.compare_at_price && variant.compare_at_price > variant.price) {
    // Check if there are no pack savings, percentage off, or pack savings sale
      if (!packSavings && !percentageOff && !packSavingsSale) {
        // Set the 'priceDisplay' variable with a multi-line template to display product price and compare price
        priceDisplay = `
        <span class="visually-hidden">Regular price</span>
        <s class="price price--full" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}">${Shopify.formatMoney(variant.compare_at_price, currency_compare_price)}</s>
        <span class="visually-hidden">Discounted price</span>
        <span class="price  price--discount" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}" data-percentage-off="${percentageOff}">${Shopify.formatMoney(variant.price, currency_price)}
        </span>
       `;
      // Check if product is pack savings product and both percentage Off and pack savings sale are explicitly set to null
      // } else if (packSavings && percentageOff === null && packSavingsSale === null) {
      } else if (packSavings) {
        // Display compare price, price and tooltip for pack savings
        priceDisplay = `
          <span class="visually-hidden">Regular price</span>
          <s class="price price--full 2" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}">${Shopify.formatMoney(variant.compare_at_price, currency_compare_price)}</s>
          <span class="visually-hidden">Discounted price</span>
          <span class="price  price--discount" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}" data-pack-savings="true" data-percentage-off="${percentageOff}">${Shopify.formatMoney(variant.price, currency_price)}
          </span>
          <block-tooltip style='position: relative' class='color-black'>
            <span class='tooltip__label price'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14px" height="14px" style="position: relative; top: 3px;">
                <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
              </svg>
            </span>
            <div class='tooltip__content text s'>
              <div class='tooltip__content--inner light-font'>
                <div
                  class='tooltip__close-button mobile--only'
                  aria-label='Close tooltip'
                  title='Close tooltip'
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="9.27271" y1="14.7781" x2="13.8689" y2="10.1819" stroke="black" stroke-width="1.5" stroke-linecap="round"></line>
                  <line x1="0.75" y1="-0.75" x2="7.25" y2="-0.75" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 13.9478 15.6567)" stroke="black" stroke-width="1.5" stroke-linecap="round"></line>
                </svg>
                </div>Compared to buying individually at full price.</div>
            </div>
          </block-tooltip>
        `;
      // Check if product is a pack saving product and has discount percentage
      // } else if (!packSavings && percentageOff) {
      //   // Display compare price, price and percentage off badgfe
      //   priceDisplay = `
      //   <span class="visually-hidden">Regular price</span>
      //   <s class="price price--full" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}">${Shopify.formatMoney(variant.compare_at_price, currency_compare_price)}</s>
      //   <span class="visually-hidden">Discounted price</span>
      //   <span class="price  price--discount" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}" data-percentage-off="${percentageOff}">${Shopify.formatMoney(variant.price, currency_price)}</span>
      //   <div class="mg-x-xs badge-top-bubble" style="background-color: #971b1b; color: #ffffff;">
      //   <span class="discount-percentage" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}">${percentageOff}% OFF</span></div>
      //  `;
      // Check if product is not a pack saving product and has no discount percentage
      } else if (packSavings === null && percentageOff === null && packSavingsSale === null && discountPercentage === null) {
        priceDisplay = `
          <span class="visually-hidden">Regular price</span>
          <s class="price price--full 2" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}">${Shopify.formatMoney(variant.compare_at_price, currency_compare_price)}</s>
          <span class="visually-hidden">Discounted price</span>
          <span class="price  price--discount" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}" data-pack-savings="false" data-percentage-off="${percentageOff}">${Shopify.formatMoney(variant.price, currency_price)}
          </span>
        `;
      } else {
        priceDisplay = `
        <span class="visually-hidden">Regular price</span>
        <s class="price price--full" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}">${Shopify.formatMoney(variant.compare_at_price, currency_compare_price)}</s>
        <span class="visually-hidden">Discounted price</span>
        <span class="price  price--discount" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}">
          ${Shopify.formatMoney(variant.price, currency_price)}
        </span>
       `;
      }
    // If variant's compare price is same as regular price. For normal variants.
    } else {
      priceDisplay = `
        <span class="visually-hidden">Regular price</span>
        <span class="price price--full" data-product-id="${priceIdElement}" data-variant-id="${priceVariantId}">${Shopify.formatMoney(variant.price, currency_price)}</span>
      `;
    };

    priceDisplayElement.innerHTML = priceDisplay;
  }

  function getJSONAvailability() {
    const data = document.getElementById('product-container').dataset.productAvailability;
    const jsonString = data.replace(/'/g, '"');
    const jsonAvailability = JSON.parse(jsonString);
    return jsonAvailability;
  }

  async function renderSection(url, handleProductFormChange) {
    let jsonAvailability = {};
    const sectionId = document.getElementById('product-container').dataset.sectionId;
    const builtUrl = `${url}?sections=${sectionId},breadcrumbs`;

    // fetch section markup
    const res = await fetch(builtUrl);

    // parse section markup
    const responseHTML = await res.json();
    const parser = new DOMParser();
    const swatchSection = parser.parseFromString(responseHTML[sectionId], 'text/html');
    const breadcrumbs = responseHTML.breadcrumbs;

    // swap out section markup
    const liveProductContainer = document.getElementById(`shopify-section-${sectionId}`);
    const liveBreadcrumbs = document.getElementById('shopify-section-breadcrumbs');
    liveProductContainer.replaceWith(swatchSection.body);
    liveBreadcrumbs.innerHTML = breadcrumbs;

    jsonAvailability = getJSONAvailability();

    // init tabs
    const accordionTabsProducts = document.querySelectorAll('.accordion__tab-products');
    initAccordions(accordionTabsProducts);

    // init swiper
    initSwiper();

    // init product form
    const newForm = document.querySelector('.product-main-form');
    const newProduct = getProductData();
    // eslint-disable-next-line prettier/prettier

    // find first available variant
    let variantId;

    // eslint-disable-next-line no-restricted-syntax
    for (const v of newProduct.variants) {
      if (v.available) {
        variantId = v.id;
        break;
      }
    }

    // init videowise
    // eslint-disable-next-line no-underscore-dangle
    window.__st.rid = newProduct.id;
    window.initVideowise();

    // init size guide listeners
    window.featuredImage = newProduct.featured_image;
    const images = {
      featured: newProduct.featured_image,
      fitFinder:
        'https://cdn.shopify.com/s/files/1/0220/4008/4552/files/fit-finder-feature-image.png?v=1681763166',
    };
    setSizeGuideListeners();

    document.querySelectorAll('#size-chart-cm .size-length').forEach((unit) => {
      const inches = unit.textContent;
      unit.textContent = inches * Math.round(2.54);
    });
    if (
      window.location.href.includes('/fit-finder') ||
      window.location.href.includes('/calculator')
    ) {
      document.querySelector('.size-guide-image').src = images.fitFinder;
    } else {
      document.querySelectorAll('.size-guide-image').forEach((image) => {
        image.src = window.featuredImage;
      });
    }

    const newEvent = new CustomEvent('fire', { detail: { variantId, newProduct, sectionId } });
    document.dispatchEvent(newEvent);

    if (window.fireTracking) {
      window.fireTracking(newEvent, newProduct);
    }

    const variant = getVariant({ variantId, product: newProduct });
    const { available } = jsonAvailability?.variants.find((v) => v.id === variantId) || {};

    // init form listeners
    newForm.addEventListener('submit', handleProductFormSubmit);
    newForm.addEventListener('change', handleProductFormChange);

    // init material swatches
    const materialSwatches = document.querySelectorAll('.material-swatch__button');
    const srEnabled = document.querySelector('.sr-enabled');
    materialSwatches.forEach((swatch) => {
      swatch.addEventListener('click', async (e) => {
        if (srEnabled) {
          await renderSection(e.target.dataset.href, handleProductFormChange);
        } else {
          window.location.href = e.target.dataset.href;
        }
      });
    });

    setButtonStates({ available });
    setPriceDisplay({ variant });
    setSizeDisplay({ variant });
    setHistoryState(url);

    // init history reload and back button support
    window.onpopstate = async function (e) {
      if (e.state.path) {
        await renderSection(e.state.path, handleProductFormChange);
      } else {
        window.location.reload();
      }
    };
  }

  async function handleProductFormChange(e) {
    let jsonAvailability = {};
    const srEnabled = document.querySelector('.sr-enabled');
    // If we clicked on a color swatch, run section rendering
    if (e.target.id.includes('colorway')) {
      if (srEnabled) {
        await renderSection(
          document.querySelector('.color-swatch input:checked').getAttribute('data-url'),
          handleProductFormChange
        );
      } else {
        window.location.href = document
          .querySelector('.color-swatch input:checked')
          .getAttribute('data-url');
      }

      if (localStorage.getItem('productSize') !== null) {
        const productSize = localStorage.getItem('productSize');
        document.querySelector(`#${productSize}`).click();
      }
    } else {
      // form input not colorway
      jsonAvailability = getJSONAvailability();
      const formData = new FormData(e.target.form);
      const newProduct = getProductData();
      const variantId = getCurrentVariantId({ formData, product: newProduct });
      const variant = getVariant({ variantId, product: newProduct });
      const { available } = jsonAvailability?.variants.find((v) => v.id == variantId) || {};
      const url = getUrlWithVariant(window.location.href, variantId);
      const size = e.target.getAttribute('id');
      localStorage.setItem('productSize', size);
      if (variant || available) {
        const button = document.querySelector('.sr-bis-btn');
      }
      setButtonStates({ available });
      setPriceDisplay(
        { variant },
        e.target.dataset.price,
        e.target.dataset.comparePrice,
        e.target.dataset.priceNoCurrency,
        e.target.dataset.comparePriceNoCurrency
      );
      setSizeDisplay({ variant });
      setHistoryState(url);
    }
  }

  // init product form listeners
  productForm.addEventListener('submit', handleProductFormSubmit);
  productForm.addEventListener('change', handleProductFormChange);
  if (subscriptionLabel && subFrequency) {
    subscriptionLabel.addEventListener('click', function () {
      sellingPlanId = document
        .querySelector('option[data-type-subscription]')
        .getAttribute('value');
    });
    if(subFrequency) {
      subFrequency.addEventListener('change', function (e) {
        sellingPlanId = e.target.value;
      });
    }
  }

  // init material swatch listeners
  const materialSwatches = document.querySelectorAll('.material-swatch__button');
  const srEnabled = document.querySelector('.sr-enabled');
  materialSwatches.forEach((swatch) => {
    swatch.addEventListener('click', async (e) => {
      if (srEnabled) {
        await renderSection(e.target.dataset.href, handleProductFormChange);
      } else {
        window.location.href = e.target.dataset.href;
      }
    });
  });
})();

window.onload = function () {
  const accordionTabsProducts = document.querySelectorAll('.accordion__tab-products');
  initAccordions(accordionTabsProducts);
  window.onpopstate = async function (e) {

  };
};
