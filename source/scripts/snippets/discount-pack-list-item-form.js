/* eslint-disable no-console */

import shopifyClient from 'UTILS/shopify-client';

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

function getCurrentVariantId({ formData, product }) {
  if (product.variants.length === 1) {
    return product.variants[0].id;
  }

  if (product.variants.length > 1) {
    // get all values with [Option-Name, value] pairing
    const options = Array.from(formData.entries()).filter(([key]) => key.match('Option'));

    // get product variant that matches all options
    const variant = product.variants.find((v) => {
      const variantOptions = [v.option1, v.option2, v.option3];
      // eslint-disable-next-line no-unused-vars
      return options.every(([key, value]) => {
        return variantOptions.includes(value);
      });
    });

    if (variant) {
      return variant.id;
    }
  }
  return null;
}

async function handleDiscountPackFormSubmit(e) {
  try {
    if (e.target.dataset.delegate === 'discountpackform') {
      e.preventDefault();

      const discountItem = e.target.closest('.discount-pack-list-item');
      if (discountItem) {
        discountItem.classList.add('cart-item__loading');
      }

      const handle = e.target.dataset.productHandle;
      const { data } = await fetchProductData(handle);
      const { product } = data;
      const formData = new FormData(e.target);

      const quantity = parseInt(formData.get('quantity'), 10);

      const id = getCurrentVariantId({ formData, product });

      if (id) {
        const { success } = await shopifyClient.add({ id, quantity });
        if (success) {
          return document.dispatchEvent(new Event('cartaddsuccess'));
        }
      }
    } else if (e.target.dataset.delegate === 'discountfreeform') {
      e.preventDefault();

      const discountItem = e.target.closest('.discount-pack-list-item');
      if (discountItem) {
        discountItem.classList.add('cart-item__loading');
      }

      const handle = e.target.dataset.productHandle;
      const { data } = await fetchProductData(handle);
      const { product } = data;
      const formData = new FormData(e.target);

      const properties = {
        _free: true,
        _tier: e.target.dataset.threshold,
      };

      const quantity = 1;

      const id = getCurrentVariantId({ formData, product });

      if (id) {
        const { success } = await shopifyClient.add({ id, quantity, properties });

        if (success) {
          // dispatch event to be handled by ajax cart
          return document.dispatchEvent(new Event('cartaddsuccess'));
        }
      }
    } else if (e.target.dataset.delegate === 'testgwpform') {
      e.preventDefault();
      const handle = e.target.dataset.productHandle;
      const { data } = await fetchProductData(handle);
      const { product } = data;
      const formData = new FormData(e.target);

      const properties = {
        _free_w_purchase: true,
      };

      const quantity = 1;

      const id = getCurrentVariantId({ formData, product });

      if (id) {
        const { success } = await shopifyClient.add({ id, quantity, properties });

        if (success) {
          localStorage.setItem('test-gwp-added', true);
          return document.dispatchEvent(new Event('cartaddsuccess'));
        }
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return null;
}

document.addEventListener('submit', handleDiscountPackFormSubmit);
