/* eslint-disable */
import { h } from 'preact';
import { useStore } from '../context/StoreProvider';

export default function PackBuilderCartFooter() {
  const { state } = useStore();
  const { discount, subtotal, locale, currency, rate } = state;
  const percentage = ((subtotal / discount.max) * 100).toFixed(2);

  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });

  return (
    <div class="pack-builder-cart__footer">
      <div class="progress-bar" style={`--percentage: ${percentage}%`}>
        <div class="progress-bar__heading">
          <span class="font-small">
            {discount.amount > 0 &&
              `You’ve saved ${formatter.format((discount.amount * rate) / 100)}!`}
            {discount.next &&
              ` Add more and save ${formatter.format((discount.next * rate) / 100)}!`}
          </span>
        </div>
        <div class="progress-bar__outer">
          <div class="progress-bar__inner">
            <span class="visually-hidden">{`${percentage}%`}</span>
          </div>
        </div>
        <div class="progress-bar__subheading" />
      </div>
      <div class="pack-builder-cart__actions">
        {state.size && state.items.length > 0 && (
          <button class="button" type="submit" form="pack-builder-cart-form">
            <svg
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6263 4.35355C12.8215 4.15829 12.8215 3.84171 12.6263 3.64645L9.4443 0.464467C9.24904 0.269205 8.93246 0.269205 8.73719 0.464467C8.54193 0.659729 8.54193 0.976311 8.73719 1.17157L11.5656 4L8.73719 6.82843C8.54193 7.02369 8.54193 7.34027 8.73719 7.53553C8.93246 7.7308 9.24904 7.7308 9.4443 7.53553L12.6263 4.35355ZM-4.37114e-08 4.5L12.2727 4.5L12.2727 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z"
                fill="currentColor"
              />
              <rect
                x="4.05324e-07"
                y="4"
                width="12.2727"
                height="8.10647e-07"
                stroke="currentColor"
                stroke-width="8.10647e-07"
              />
            </svg>
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}
