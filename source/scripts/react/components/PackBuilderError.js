import { h } from 'preact';
import { useStore } from '../context/StoreProvider';

function PackBuilderError() {
  const { state } = useStore();

  if (state.error === 422) {
    return (
      <div class="packbuilder-error font-small text-center" aria-live="polite">
        Some items in your bundle are currently out of stock.
      </div>
    );
  }

  if (state.error) {
    return (
      <div class="packbuilder-error font-small text-center" aria-live="polite">
        There was a problem adding to cart. Please try again later.
      </div>
    );
  }

  return null;
}

export default PackBuilderError;
