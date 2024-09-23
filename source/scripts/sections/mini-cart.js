/* eslint-disable */
import shopifyClient from 'UTILS/shopify-client';
import { createFocusTrap } from 'focus-trap';
import { showMenu, hideMenu } from 'UTILS/drawer-menu-handler';

const parser = new DOMParser();
const miniCartSection = document.querySelector('#shopify-section-mini-cart');

const trap = createFocusTrap(miniCartSection);
const state = { active: false };

function changeTitle(title) {
  const currentTitle = document.title;
  function newTitle() {
    document.title = title;
    setTimeout(function () {
      oldTitle();
    }, 3000);
  }
  function oldTitle() {
    document.title = currentTitle;
    setTimeout(function () {
      newTitle();
    }, 3000);
  }
  setTimeout(function () {
    newTitle();
    document.title = title;
  }, 60000);
}

function showMiniCart() {
  showMenu(miniCartSection, trap);
  state.active = true;

  const element = document.querySelector('.cc-window');
  if (element) {
    element.classList.add('hide');
  }
}

function hideMiniCart() {
  hideMenu(miniCartSection, trap);
  state.active = false;

  const element = document.querySelector('.cc-window.hide');
  if (element) {
    element.classList.remove('hide');
  }
}

async function getMiniCartSection() {
  try {
    let res;
    const languagePattern = window.location.href.match(/\/[a-z]{2}-[a-z]{2}/);
    let mySubString = '/';
    if (languagePattern) {
      mySubString = languagePattern[0];
    }
    res = await fetch(`${mySubString}?sections=mini-cart`);
    const json = await res.json();
    const section = json['mini-cart'];
    return section;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function renderMiniCart() {
  const sectionHTML = await getMiniCartSection();
  const parser = new DOMParser();
  const doc = parser.parseFromString(sectionHTML, 'text/html');
  const nextSection = doc.querySelector('#shopify-section-mini-cart');

  miniCartSection.innerHTML = nextSection.innerHTML;
  // check local storage for test-gwp
  const testGwp = sessionStorage.getItem('test-gwp');
  const testGwpAdded = sessionStorage.getItem('test-gwp-added');
  const testGwpPopupClosed = sessionStorage.getItem('test-gwp-popup-closed');

  if (testGwp) {
    const thresholdCart = document.getElementsByClassName('mini-cart__progress-bar-wrapper')[0];
    const testGWPsection = document.getElementsByClassName('mini-cart__test-gwp')[0];
    const freeGift = document.getElementsByClassName('progress-bar__subheading tiered-free-items')[0];
    // thresholdCart.style.display = 'none';
    if (freeGift) {
      // freeGift.style.display = 'none';
    }
    if (testGWPsection) {
      testGWPsection.classList.remove('hidden');
    }
  }

  if (document.querySelector('.cart-line-item')) {
    const lineItem = document.querySelectorAll('.cart-line-item');
    lineItem.forEach(function (e) {
    });
  }

  if (document.querySelector('.free-line-item')) {
    const freeLineItem = document.querySelectorAll('.free-line-item');

    function fireClick(node) {
      if (document.createEvent) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        node.dispatchEvent(evt);
      } else if (document.createEventObject) {
        node.fireEvent('onclick');
      } else if (typeof node.onclick == 'function') {
        node.onclick();
      }
    }

    freeLineItem.forEach(function (e) {
      let tier = e.dataset.tier;
      let total = document.querySelector('.mini-cart__subtotal td').dataset.price;

      tier = parseInt(tier);
      total = parseInt(total) * 100;
      if (total < tier) {
        fireClick(e);
      }
    });
  }

  const discountPackSlider = document.querySelector('.discount-pack-slider ul');
  if (discountPackSlider) {
    const discountPackSliderPrev = document.querySelector('.slider-control-prev');
    const discountPackSliderNext = document.querySelector('.slider-control-next');

    discountPackSliderPrev.addEventListener('click', function () {
      discountPackSliderNext.classList.remove('opacity-transition');
      var scrollAmount = -300;
      var currentScrollLeft = discountPackSlider.scrollLeft;
      var newScrollLeft = currentScrollLeft + scrollAmount;

      if (newScrollLeft <= 0) {
        discountPackSliderPrev.classList.add('opacity-transition');
      }

      discountPackSlider.scrollLeft = newScrollLeft;
    });

    discountPackSliderNext.addEventListener('click', function () {
      discountPackSliderPrev.classList.remove('opacity-transition');
      var scrollAmount = 300;
      var currentScrollLeft = discountPackSlider.scrollLeft;
      var newScrollLeft = currentScrollLeft + scrollAmount;

      if (newScrollLeft >= discountPackSlider.scrollWidth - discountPackSlider.clientWidth) {
        discountPackSliderNext.classList.add('opacity-transition');
      }

      discountPackSlider.scrollLeft = newScrollLeft;
    });

    const upsellItems = document.querySelectorAll('[data-delegate="discountpackform"]');

    upsellItems.forEach(item => {
      const productId = item.id.split('pack-').pop();
      let selectElement = item.querySelector('select');
      let options = selectElement.options;

      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const sku = option.getAttribute('data-variant');
      }
    });
  }
}

// increments quantity counter
function handleCartCount(item_count) {
  const cartCount = document.querySelector('.cart-count');

  if (item_count > 0 && cartCount.classList.contains('hide')) {
    cartCount.classList.remove('hide');
    // Get all cart line items
  } else if (item_count < 1) {
    cartCount.classList.add('hide');
  }

  if (item_count > 0) {
    setTimeout(function () {
      const cartLineItems = document.querySelectorAll('.cart-line-item');

      // Iterate over each line item
      cartLineItems.forEach((lineItem) => {
        // Get the price
        const priceElement = lineItem.getAttribute('data-line-item-price');
        const price = priceElement / 100;

        // Get the quantity
        const quantitySelect = lineItem.querySelector('[data-line-item-quantity-input]');
        const quantity = quantitySelect.value;

        // Get the ID
        const idElement = lineItem.querySelector('[data-line-item-id]');
        const id = idElement.getAttribute('data-line-item-id');

        function getCookie(name) {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
              return cookie.substring(name.length + 1);
            }
          }
          return null;
        }

        // Get the value of the "cart_currency" cookie
        const cartCurrency = getCookie('cart_currency');
      });
    }, 2000);
  }

  cartCount.textContent = item_count;
}

// handles global cartaddsuccess event
async function handleCartAddSuccess() {
  const { data } = await shopifyClient.cart();
  const { item_count } = data;
  handleCartCount(item_count);
  await renderMiniCart();
  await showMiniCart(miniCartSection);
  sessionStorage.tabTitle = 'Forget something?';
  changeTitle(sessionStorage.tabTitle);
  offsetPostScript();
}

// handles form changes in mini cart
let timeout;
async function handleCartFormChange(e) {
  if (e.target.form.dataset.delegate === 'minicartform') {
    const cartLineItem = e.target.closest('.cart-line-item');
    if (cartLineItem) {
      cartLineItem.classList.add('cart-item__loading');
    }
    clearTimeout(timeout);
    const { form } = e.target;
    const request = { updates: {} };
    let cart_count = 0;
    Array.from(form.elements).forEach((el) => {
      if (el.dataset.lineItemQuantityInput && el.dataset.lineItemKey) {
        const quantity = parseInt(el.value, 10);
        request.updates[el.dataset.lineItemKey] = quantity;
        cart_count += quantity;
      }
    });

    // use line item keys because of possible pack builder issues
    // send request to update cart after form changes have settled
    timeout = setTimeout(async () => {
      await shopifyClient.update(request);
      handleCartCount(cart_count);
      await renderMiniCart();
    }, 300);
  }
}

async function handleRemoveButtonClick(e) {
  if (e.target.dataset.delegate === 'lineitemremove') {
    const cartLineItem = e.target.closest('.cart-line-item');
    if (cartLineItem) {
      cartLineItem.classList.add('cart-item__loading');
    }

    const { lineItemKey } = e.target.dataset;
    const { success } = await shopifyClient.remove(lineItemKey);
    const { data } = await shopifyClient.cart();
    const { item_count } = data;
    handleCartCount(item_count);

    await renderMiniCart();
  }
}

async function handleRemovePackButtonClick(e) {
  if (e.target.dataset.delegate === 'packremove') {
    const { packKey } = e.target.dataset;
    const {
      data: { items },
    } = await shopifyClient.cart();

    const updates = items.reduce((obj, lineItem) => {
      // eslint-disable-next-line dot-notation
      if (lineItem.properties['_key'] === packKey) {
        console.log(lineItem.key);
        const elements = document.querySelectorAll('[data-line-item-key="' + lineItem.key + '"]');
        elements.forEach(element => {
          element.style.opacity = '0.6';
        });
        return { ...obj, [`${lineItem.key}`]: 0 };
      }
      return obj;
    }, {});
    const { success } = await shopifyClient.update({ updates });
    const { data } = await shopifyClient.cart();
    const { item_count } = data;
    handleCartCount(item_count);
    await renderMiniCart();
  }
}

async function handleOpenButtonClick(e) {
  if (e.target.dataset.delegate === 'minicartopen') {
    renderMiniCart();
    showMiniCart();
    offsetPostScript();
  }
}

function handleCloseButtonClick(e) {
  if (e.target.dataset.delegate === 'minicartclose') {
    hideMiniCart();
  }
}

function handleOutsideClick(e) {
  if (state.active && !e.target.closest('.mini-cart')) {
    hideMiniCart();
  }
}

function offsetPostScript() {
  const widgetContainer = document.getElementById("ps__widget_container");

  if (widgetContainer) {
      widgetContainer.style.zIndex = 999;
  } else {
      console.log("Element with ID 'ps__widget_container' not found.");
  }
}

async function handleGiftWrapFormSubmit(e) {
  if (e.target.dataset.delegate === 'giftwrapform') {
    e.preventDefault();
    e.target.classList.add('cart-item__loading');
    const loaderSpinner = e.target.querySelector('.button.dark.small');
    const buttonText = e.target.querySelector('.btn-text');
    loaderSpinner.classList.add('loading');
    buttonText.classList.add('hidden');
    const formData = new FormData(e.target);
    const quantity = parseInt(formData.get('quantity'), 10);
    const { success } = await shopifyClient.add({
      id: e.target.dataset.variantId,
      quantity,
      properties: { _wrap: true },
    });
    if (success) {
      e.target.classList.remove('cart-item__loading');
      loaderSpinner.classList.remove('loading');
      buttonText.classList.remove('hidden');
      await renderMiniCart();
    }
  }
}

async function addMembershipToCart(e) {
  if (e.target.dataset.delegate === 'cartmembershipupsell') {
    e.preventDefault();
    e.target.classList.add('cart-item__loading');
    const loaderSpinner = e.target.querySelector('.button.bg-color-yellow.color-brand-black');
    const buttonText = e.target.querySelector('.btn-text');
    loaderSpinner.classList.add('loading');
    buttonText.classList.add('hidden');
    const formData = new FormData(e.target);
    const sellingPlanId = e.target.dataset.variantSellingPlanId;
    const { success } = await shopifyClient.add({
      id: e.target.dataset.variantId,
      quantity: 1,
      selling_plan: sellingPlanId,
      properties: { _inveterate_subscription: true, },
    });
    if (success) {
      e.target.classList.remove('cart-item__loading');
      loaderSpinner.classList.remove('loading');
      buttonText.classList.remove('hidden');
      await renderMiniCart();
    }
  }
}

const cartOverlay = document.getElementById('shopify-section-mini-cart');
const becomeMemberButton = document.getElementById('addToCartButton');
cartOverlay.addEventListener('submit', addMembershipToCart);
cartOverlay.addEventListener('click', handleOutsideClick);
document.addEventListener('cartaddsuccess', handleCartAddSuccess);
document.addEventListener('click', handleOpenButtonClick);
document.addEventListener('click', handleCloseButtonClick);
cartOverlay.addEventListener('change', handleCartFormChange);
document.addEventListener('click', handleRemoveButtonClick);
document.addEventListener('click', handleRemovePackButtonClick);
document.addEventListener('submit', handleGiftWrapFormSubmit);
