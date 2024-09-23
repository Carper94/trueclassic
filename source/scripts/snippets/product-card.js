/* eslint-disable */
import { getCurrentVariantId, getVariant } from 'UTILS/product-form';
import imgUrl from 'UTILS/images/imgUrl';
import shopifyClient from 'UTILS/shopify-client';

function createSrcSet(src) {
  return `
    ${imgUrl(src, 200)} 200w,
    ${imgUrl(src, 300)} 300w,
    ${imgUrl(src, 400)} 400w
  `;
}

async function submitQuickAdd(id, target, sellingPlanId) {

  const quickATC          = target.closest('.product-card').querySelector('.product-card__quick-atc');
  const sizeSelectorWrap  = target.closest('.product-card').querySelector('.product-card__size-selector');
  const parentFieldSets   = target.closest('form').querySelectorAll('fieldset')
  const labels            = target.closest('form').querySelectorAll('label');
  const dataForDataLayer  = target.dataset.layer

  try {

    let formData

    // I dont know why this has to be a string 'null' instead of just null. In the function call, I am passing null.
    // Don't change this it will break.

    if(sellingPlanId !== 'null') {

      formData = {
        'items': [{
            'id': id,
            'quantity': 1,
            'selling_plan': sellingPlanId
        }]
      }

    } else {

      formData = {
        'items': [{
          'id': id,
          'quantity': 1
        }]
      }

    }

    const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!res.ok) {
      console.log('res not ok !!')
      console.log(res);
      return -1;
    }

    if (res.ok) {

      console.log('success!!!')

      quickATC.classList.remove('mobile-only');
      sizeSelectorWrap.classList.remove('active');

      // reset relevant cards elements
      labels.forEach((label) => {
        label.classList.remove('loading')
      })
      parentFieldSets.forEach((fieldSet) => {
        fieldSet.classList.contains('first-step') ? fieldSet.classList.add('active') :  fieldSet.classList.remove('active')    
      })
      // push datalayer info
       dataLayer.push({ 'ecommerce': null });
       dataLayer.push(dataForDataLayer)

      // dispatch event to be handled by ajax cart
      return document.dispatchEvent(new Event('cartaddsuccess'));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return -1;
  }
}

function handleProductCardFormChange(e) {
  document.querySelectorAll('.klaviyo-button-container').forEach((item) => {
    item.style.position = 'unset';
  });
  if (e.target.form.dataset.delegate === 'productcardform') {
    const sizeForm = document.querySelector('[data-delegate="packbuildersizeform"]');
    // get size option from other form
    const sizeFormData = new FormData(sizeForm);
    const sizeSelect = e.target.form.querySelector('.size-select');
    let sizeOption;

    if (sizeSelect != null) {
      sizeOption = sizeSelect.querySelector('select option:checked').value;
    } else {
      sizeOption = sizeFormData.get('Option-Size');
    }

    const formData = new FormData(e.target.form);
    formData.set('Option-Size', sizeOption);

    const productCard = e.target.closest('.product-card');
    const product = JSON.parse(productCard.querySelector('[data-product-json]').textContent);

    const variantId = getCurrentVariantId({ formData: formData, product });
    const variant = getVariant({ variantId, product });
    const productButton = e.target.closest('.product-card').querySelector('.button');
    const notifyButton = e.target
      .closest('.product-card')
      .querySelector('.klaviyo-button-container');
    const productAction = e.target.closest('.product-card').querySelector('.product-card__actions');
    var optionId = e.target.getAttribute('id');
    if (variant.available) {
      productButton.removeAttribute('disabled');
      productButton.classList.remove('disabled');
      notifyButton.classList.remove('show_klaviyo-button-container');
      productAction.classList.remove('klaviyo_notify-me');
      productButton.classList.remove('hidden');
    } else {
      productButton.setAttribute('disabled', '');
      productButton.classList.add('disabled');
      notifyButton.classList.add('show_klaviyo-button-container');
      productAction.classList.add('klaviyo_notify-me');
      productButton.classList.add('hidden');
      document.querySelector(`label[for="${optionId}"]`).setAttribute('title', 'out of stock');
    }

    // change image on card
    if (variant) {
      const productCardImage = productCard.querySelector('.product-card__image');
      const srcSet = createSrcSet(variant.featured_image.src);
      productCardImage.setAttribute('src', variant.featured_image.src);
      productCardImage.setAttribute('srcset', srcSet);
      productCard.querySelector('.product-card__color').textContent = variant.option2;
    }
  }
}

document.addEventListener('click', async function (e) {
  if (e.target && e.target.hasAttribute('data-quick-atc')) {
    e.preventDefault();
    e.target.closest('.product-card').querySelector('.product-card__size-selector').classList.add('active');
    e.target.classList.add('mobile-only');
  }
  // close optiion 
  if (e.target && e.target.classList.contains('product-card__icon-close')) {
    e.preventDefault();
    e.target.closest('.product-card__size-selector').classList.remove('active');
    e.target
      .closest('.product-card')
      .querySelector('.product-card__quick-atc')
      .classList.remove('mobile-only');
  }
  if (e.target && e.target.closest('.product-card__size-selector') &&!e.target.closest('.size-option')){
    e.preventDefault();
  }
  if(e.target.classList.contains('quick-atc-option')) {

    const parentFieldset = e.target.closest('fieldset')

    // set option to loading

    e.target.closest('.size-option').querySelector('label').classList.add('loading')

    // clear all selected attributes for given option
    parentFieldset.querySelectorAll('.size-option input').forEach((input) => {input.setAttribute('selected', false)})
    // set selected one to true
    e.target.setAttribute('selected', true) 

    if(parentFieldset.classList.contains('submit-quick-add')) {

      const optionArray = []
      const selectedPlanEl = e.target.closest('form').querySelector('fieldset .frequency-option input[selected="true"]')
      const selectedPlanId = selectedPlanEl === null ? null : selectedPlanEl.value
      const selectedOptions = e.target.closest('form').querySelectorAll('fieldset .size-option input[selected="true"]')
      const handle = e.target.closest('form').dataset.handle

      selectedOptions.forEach((option) => {
        if(!option.classList.contains('is-selling-plan')) {
          optionArray.push(option.value)
        }    
       
      })

      // grab all possible product variants from product API
      const res = await fetch(`${window.Shopify.routes.root}products/${handle}.js`)
      const { variants } = await res.json()

      // double loop through all variant options using option array, if both are present in variant options
      variants.forEach((variant) => {
        let matches = 0
        for(let i = 0; i < optionArray.length; i++) {
          if(variant.options.includes(optionArray[i])){
            matches++
            if(matches === optionArray.length) {
              submitQuickAdd(variant.id, e.target, selectedPlanId)
            }
          } else {
            break
          }
        }
      })

    } else {
      // remove current active, set next active
      parentFieldset.classList.remove('active')
      parentFieldset.nextElementSibling.classList.add('active')
    }
  }
});


document.addEventListener('change', async (e) => {
  return
  // no longer being used
  console.log(' changed !! ////////////////// ');
  if (e.target && e.target.classList.contains('quick-atc-option')) {
    const id = e.target.value;

    const label = e.target.closest('.size-option').querySelector('label');
    const quickATC = e.target.closest('.product-card').querySelector('.product-card__quick-atc');
    let theInput = e.target.closest('.size-option').querySelector('input');
    const sizeSelectorWrap = e.target.closest('.product-card').querySelector('.product-card__size-selector');

    // label.classList.add('loading');
    console.log(id);
    return
    if (id) {
      try {
        const { success, res, error } = await shopifyClient.add({ id, quantity: 1 });

        if (!success) {
          console.log(res);
          return -1;
        }

        if (success) {
          label.classList.remove('loading');
          quickATC.classList.remove('mobile-only');
          sizeSelectorWrap.classList.remove('active');
          theInput.checked = false;
          // dispatch event to be handled by ajax cart
          return document.dispatchEvent(new Event('cartaddsuccess'));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return -1;
      }
    }
  }
  return -1;
});

if (window.isPageBuilderPage) {
  document.addEventListener('change', handleProductCardFormChange);
}
