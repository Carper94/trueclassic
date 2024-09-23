import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import imgUrl from 'UTILS/images/imgUrl';
import { useStore } from '../context/StoreProvider';
import addPackbuilderItemsToCart from '../functions/addPackbuilderItemsToCart';
import PackBuilderError from './PackBuilderError';

function MiniCartPackBuilderRecapture() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    const parent = document.querySelector('.mini-cart__packbuilder-recapture');
    if (state.items.length && parent) {
      parent.classList.add('active');
    }
    return () => {
      if (parent) {
        parent.classList.remove('active');
      }
    };
  }, [state]);

  if (!state.items.length) {
    return null;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const { success, res } = await addPackbuilderItemsToCart(state);
    if (success) {
      const parent = document.querySelector('.mini-cart__packbuilder-recapture');
      if (parent) {
        parent.classList.remove('active');
      }
      document.dispatchEvent(new Event('cartaddsuccess'));
      dispatch({ type: 'clear' });
      window.localStorage.removeItem('packbuilder-state');
    } else {
      dispatch({ type: 'seterror', payload: res?.status });
    }
  }

  return (
    <>
      <h3 class="headline text-center h5">Pick Up Where You Left Off</h3>
      <form onSubmit={handleFormSubmit}>
        <PackBuilderError />
        <div class="mini-cart__packbuilder-item">
          <div class="mini-cart__packbuilder-item__image-container">
            <div class="mini-cart__packbuilder-item__image-wrapper">
              <img
                class="mini-cart__packbuilder-item__image"
                loading="lazy"
                src={imgUrl(state.items[0].variant.featured_image.src, 100)}
              />
            </div>
          </div>
          <div class="mini-cart__packbuilder-item__details">
            <div class="mini-cart__packbuilder-item__title">
              <span class="h5">Your bundle</span>
            </div>
            <div class="mini-cart__packbuilder-item__price h5" />
            <div class="mini-cart__packbuilder-item__items font-small">
              {state.items.reduce((acc, item) => {
                const next = acc + item.quantity;
                return next;
              }, 0)}{' '}
              items
            </div>
          </div>
          <div class="mini-cart__packbuilder-item__actions">
            <button type="submit" class="button dark xsmall">
              Add
            </button>
            <a class="text-center font-small" href="/collections/bundle-builder">
              Edit bundle
            </a>
          </div>
        </div>
      </form>
    </>
  );
}

export default MiniCartPackBuilderRecapture;
