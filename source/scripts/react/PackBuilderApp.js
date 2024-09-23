/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import 'preact/debug';
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { getCurrentVariantId, getVariant } from 'UTILS/product-form';
import Portal from './components/Portal';
import PackBuilderCartHeader from './components/PackBuilderCartHeader';
import PackBuilderLineItemList from './components/PackBuilderLineItemList';
import { useStore, StoreProvider, initialState } from './context/StoreProvider';
import PackBuilderCartForm from './components/PackBuilderCartForm';
import PackBuilderCartFooter from './components/PackBuilderCartFooter';
import MiniCartPackBuilderRecapture from './components/MiniCartPackBuilderRecapture';
import addPackbuilderItemsToCart from './functions/addPackbuilderItemsToCart';
import PackBuilderError from './components/PackBuilderError';

const selectors = {
  packbuilder: '.pack-builder',
  cart: '.pack-builder-cart',
  scrimWrapper: '.pack-builder__scrim-wrapper',
  productCard: '.product-card',
  recapture: '.mini-cart__packbuilder-recapture',
  currency: '#pack-builder-cart-currency',
};

const types = {
  accessory: [
    'Boxer Pack Builder',
    'Hat',
    'Socks Pack Builder',
    'Comfort Chino Pants Pack Builder',
    'Comfort Chino Short Pack Builder',
    'Active Joggers Pack Builder',
    'Active Quick Dry Short ',
    'Pants',
    'Jeans',
    'TALL',
  ],
};

const initialSizeFormHTML = document.querySelector(
  '[data-delegate="packbuildersizeform"]'
)?.innerHTML;

function PackBuilder() {
  const { state, dispatch } = useStore();

  function getProductData() {
    const products = Array.from(
      document.querySelectorAll(`${selectors.packbuilder} script[data-product-json]`)
    ).map((el) => JSON.parse(el.textContent));
    dispatch({ type: 'setproducts', payload: products });
  }

  function setVisibleProducts() {
    document.querySelectorAll('.klaviyo-button-container').forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.style.position = 'unset';
    });
    // generate array of indexes for visible product cards
    const indexes = state.products.reduce((acc, product, i) => {
      // if is an accessory, should be visible
      if (types.accessory.includes(product?.type)) {
        acc.push(i);
        return acc;
      }
      // if has matching size, should be visible
      const hasSizeVariant = product?.variants.some((v) => {
        return v.options.includes(state.size);
      });
      if (hasSizeVariant) {
        acc.push(i);
        return acc;
      }
      return acc;
    }, []);

    const productCards = document.querySelectorAll(
      `${selectors.packbuilder} ${selectors.productCard}`
    );

    productCards.forEach((card, i) => {
      const sizeForm = document.querySelector('[data-delegate="packbuildersizeform"]');
      // get size option from other form
      const sizeFormData = new FormData(sizeForm);
      const sizeOption = sizeFormData.get('Option-Size');

      const productCardFormData = new FormData(
        card.querySelector('[data-delegate="productcardform"]')
      );

      if (!productCardFormData.get('Option-Size') && sizeOption) {
        productCardFormData.set('Option-Size', sizeOption);
      }

      // get product data from card
      const product = JSON.parse(card.querySelector('[data-product-json]').textContent);
      const variantId = getCurrentVariantId({ formData: productCardFormData, product });
      const variant = getVariant({ variantId, product });
      // add to state
      if (variant) {
        if (variant && variant.available === false) {
          card.querySelector('.button').setAttribute('disabled', '');
          card.querySelector('.button').classList.add('disabled');
          card.querySelector('.button').classList.add('hidden');
          card.querySelector('.product-card__actions').classList.add('klaviyo_notify-me');
          card
            .querySelector('.klaviyo-button-container')
            .classList.add('show_klaviyo-button-container');
          if (card.querySelector(`label[data-color="${variant.option2}"]`)) {
            card
              .querySelector(`label[data-color="${variant.option2}"]`)
              .setAttribute('title', 'out of stock');
            card.querySelector(`label[data-color="${variant.option2}"]`).style.backgroundColor =
              'gray';
            card.querySelector(`label[data-color="${variant.option2}"]`).style.opacity = '0.1';
          }
        }
      }

      // show card not in list of visible cards
      if (indexes.includes(i)) {
        return card.classList.remove('hide');
      }
      // hide card
      return card.classList.add('hide');
    });
  }

  function handleSizeFormChange(e) {
    if (e.target.form.dataset.delegate === 'packbuildersizeform') {
      const { value } = e.target;
      dispatch({ type: 'sizechange', payload: value });
    }
  }

  function clearSizeForm() {
    const sizeForm = document.querySelector('[data-delegate="packbuildersizeform"]');
    if (sizeForm) {
      // bit of a hack to de-select radio buttons
      sizeForm.innerHTML = initialSizeFormHTML;
    }
  }

  function handleProductCardFormSubmit(e) {
    if (e.target.dataset.delegate === 'productcardform') {
      e.preventDefault();
      try {
        const sizeForm = document.querySelector('[data-delegate="packbuildersizeform"]');
        // get size option from other form
        const sizeFormData = new FormData(sizeForm);
        const sizeOption = sizeFormData.get('Option-Size');

        const productCardFormData = new FormData(e.target);

        // if card does not include size select, add size option to product card data from primary size form
        if (!productCardFormData.get('Option-Size') && sizeOption) {
          productCardFormData.set('Option-Size', sizeOption);
        }
        const quantity = parseInt(productCardFormData.get('quantity'), 10);

        // get product data from card
        const productCard = e.target.closest('.product-card');
        const product = JSON.parse(productCard.querySelector('[data-product-json]').textContent);
        const variantId = getCurrentVariantId({ formData: productCardFormData, product });
        const variant = getVariant({ variantId, product });

        // add to state
        if (variant.available !== false) {
          dispatch({ type: 'addtobundle', payload: { id: variantId, quantity, variant, product } });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handlePackBuilderCartFormSubmit(e) {
    e.preventDefault();

    const { success, res } = await addPackbuilderItemsToCart(state);

    if (success) {
      document.dispatchEvent(new Event('cartaddsuccess'));
      dispatch({ type: 'clear' });
      clearSizeForm();
    } else {
      dispatch({ type: 'seterror', payload: res?.status });
    }
  }

  useEffect(() => {
    const storedState = window.localStorage.getItem('packbuilder-state');
    if (storedState) {
      try {
        const nextState = JSON.parse(storedState);
        dispatch({
          type: 'setstoredstate',
          payload: { ...nextState },
        });
      } catch (error) {
        dispatch({ type: 'clear' });
      }
    }

    getProductData();

    // set currency to global state
    if (window.Shopify) {
      const { locale, country, currency } = window.Shopify;
      dispatch({ type: 'setlocale', payload: `${locale}-${country}` });
      dispatch({ type: 'setcurrency', payload: currency?.active });
      dispatch({ type: 'setrate', payload: +currency?.rate });
    }

    // these forms are not part of react app
    document.addEventListener('submit', handleProductCardFormSubmit);
    document.addEventListener('change', handleSizeFormChange);
    return () => {
      document.removeEventListener('submit', handleProductCardFormSubmit);
    };
  }, []);

  // on size change set product visibility
  useEffect(() => {
    const isInitialState = JSON.stringify(initialState) === JSON.stringify(state);
    if (!isInitialState && state.size) {
      setVisibleProducts();
    }
  }, [state.size]);

  // set checked value in size form
  useEffect(() => {
    try {
      const sizeForm = document.querySelector('[data-delegate="packbuildersizeform"]');
      if (sizeForm) {
        const sizeFormValue = Array.from(sizeForm.elements).find((el) => el.checked)?.value;
        if (state.size && !sizeFormValue) {
          const sizeInput = Array.from(sizeForm.elements).find((el) => el.value === state.size);
          sizeInput.setAttribute('checked', true);
          sizeInput.dispatchEvent(new Event('change'));
        }
      }
    } catch (error) {
      dispatch({ type: 'clear' });
    }
  }, [state.size]);

  // on state change, write state to localstorage
  useEffect(() => {
    window.localStorage.setItem('packbuilder-state', JSON.stringify({ ...state, error: null }));
  }, [state]);

  // on size clear in state, clear form
  useEffect(() => {
    if (!state.size) {
      clearSizeForm();
    }
  }, [state.size]);

  return (
    <>
      <Portal selector={selectors.scrimWrapper}>
        {!state.size && <div class="pack-builder__scrim" />}
      </Portal>
      <Portal selector={selectors.cart}>
        <PackBuilderCartForm onSubmit={handlePackBuilderCartFormSubmit}>
          <PackBuilderCartHeader />
          <PackBuilderError />
          <div class="pack-builder-cart__list-wrapper mg-b-s">
            <PackBuilderLineItemList items={state.items} />
          </div>
          <PackBuilderCartFooter />
        </PackBuilderCartForm>
      </Portal>
      <Portal selector={selectors.recapture}>
        <MiniCartPackBuilderRecapture />
      </Portal>
    </>
  );
}

export default function PackBuilderApp() {
  if (!window.isPageBuilderPage) {
    return null;
  }

  return (
    <StoreProvider>
      <PackBuilder />
    </StoreProvider>
  );
}
