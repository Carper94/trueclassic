import { h } from 'preact';
import { useStore } from '../context/StoreProvider';

export default function PackBuilderCartHeader() {
  const {
    state: { subtotal, items, locale, currency, rate, discount },
  } = useStore();

  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
  const originalPrice = subtotal / 100;
  const discountedPrice = (subtotal - discount.amount * rate) / 100;
  const originalPriceString = formatter.format(originalPrice);

  let discountedPriceString = '';
  if (discount.amount > 0) {
    discountedPriceString = formatter.format(discountedPrice);
  }

  const totalQuantity = items.reduce((a, c) => a + c.quantity, 0);

  return (
    <div class="pack-builder-cart__header">
      <h2 class="h5 headline">Your bundle {totalQuantity} items</h2>
      <div class="pack-builder-cart__total">
        {discountedPriceString !== '' && <del>{originalPriceString}</del>}
        <div>
          {discountedPriceString !== '' ? `${discountedPriceString}` : `${originalPriceString}`}
        </div>
      </div>
      <button
        class="pack-builder-cart__toggle text-button"
        type="button"
        aria-expanded="false"
        data-delegate="packbuildercarttoggle"
      >
        <span class="open">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="svg-icon svg-icon--expand-more"
            fill="currentColor"
          >
            <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
          </svg>
          <span class="visually-hidden">Open</span>
        </span>
        <span class="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="svg-icon svg-icon--expand-less"
            fill="currentColor"
          >
            <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          </svg>
          <span class="visually-hidden">Close</span>
        </span>
      </button>
    </div>
  );
}
