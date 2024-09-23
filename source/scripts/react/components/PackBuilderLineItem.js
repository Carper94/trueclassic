/* eslint-disable */
import { h } from 'preact';
import imgUrl from 'UTILS/images/imgUrl';
import { useStore } from '../context/StoreProvider';

export default function PackBuilderLineItem({ title, k, image, options, quantity }) {
  const { dispatch } = useStore();

  function handleQuantityChange(e) {
    const { value } = e.target;
    dispatch({ type: 'quantitychange', payload: { key: k, quantity: parseInt(value, 10) } });
  }

  return (
    <li class="pack-builder-line-item">
      <div class="pack-builder-line-item__image-container">
        <div class="pack-builder-line-item__image-wrapper">
          <img
            class="pack-builder-line-item__image"
            loading="lazy"
            src={imgUrl(image.src, 75)}
            alt={image.alt}
          />
        </div>
      </div>
      <div class="pack-builder-line-item__details">
        <div class="pack-builder-line-item__title">
          <span class="h5">{title}</span>
        </div>

        <div class="pack-builder-line-item__price h5">{/* // TODO add price component */}</div>

        <div class="pack-builder-line-item__options font-small">
          <ul>
            {options.map((value) => {
              return <li key={value}>{value}</li>;
            })}
          </ul>
        </div>
      </div>
      <div class="pack-builder-line-item__actions">
        <div class="pack-builder-line-item__quantity-wrapper">
          <select id={`quantity-${k}`} disabled="disabled">
            {/* generate options up to quantity plus four */}
            {[...Array(quantity + 4).keys()]
              .map((i) => i + 1)
              .map((number) => {
                return (
                  <option key={`${number}-${k}`} value={number} selected={quantity === number}>
                    {number}
                  </option>
                );
              })}
          </select>
          <label class="visually-hidden" for={`quantity-${k}`}>
            Quantity
          </label>
        </div>
        <div class="pack-builder-line-item__remove-wrapper">
          <button
            class="text-button light-font h5"
            type="button"
            data-delegate="lineitemremove"
            onClick={() => dispatch({ type: 'remove', payload: { key: k } })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="#7676">
              <path d="M6.2439 7.13415C6.56718 7.13415 6.82927 7.39623 6.82927 7.71951V12.0122C6.82927 12.3355 6.56718 12.5976 6.2439 12.5976C5.92062 12.5976 5.65854 12.3355 5.65854 12.0122V7.71951C5.65854 7.39623 5.92062 7.13415 6.2439 7.13415Z" fill="#414141" />
              <path d="M9.95122 7.71951C9.95122 7.39623 9.68913 7.13415 9.36585 7.13415C9.04258 7.13415 8.78049 7.39623 8.78049 7.71951V12.0122C8.78049 12.3355 9.04258 12.5976 9.36585 12.5976C9.68913 12.5976 9.95122 12.3355 9.95122 12.0122V7.71951Z" fill="#414141" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29268 3.23171V2.06098C4.29268 1.19887 4.99156 0.5 5.85366 0.5H9.7561C10.6182 0.5 11.3171 1.19887 11.3171 2.06098V3.23171H15.0244C15.3477 3.23171 15.6098 3.49379 15.6098 3.81707C15.6098 4.14036 15.3477 4.40244 15.0244 4.40244H13.9799L13.3547 15.0307C13.3062 15.8558 12.6229 16.5 11.7964 16.5H3.81332C2.98682 16.5 2.30357 15.8558 2.25503 15.0307L1.62985 4.40244H0.585366C0.26208 4.40244 0 4.14036 0 3.81707C0 3.49379 0.26208 3.23171 0.585366 3.23171H4.29268ZM5.85366 1.67073H9.7561C9.97159 1.67073 10.1463 1.84545 10.1463 2.06098V3.23171H5.46341V2.06098C5.46341 1.84545 5.63813 1.67073 5.85366 1.67073ZM2.8026 4.40244L3.42374 14.962C3.43588 15.1682 3.60669 15.3293 3.81332 15.3293H11.7964C12.003 15.3293 12.1739 15.1682 12.186 14.962L12.8072 4.40244H2.8026Z" fill="#414141" />
            </svg>
            <span class="visually-hidden">Remove Pack</span>
          </button>
        </div>
      </div>
    </li>
  );
}
