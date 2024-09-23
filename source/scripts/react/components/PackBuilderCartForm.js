import { h } from 'preact';

export default function PackBuilderCartForm({ onSubmit, children }) {
  return (
    <form id="pack-builder-cart-form" class="pack-builder-cart__form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
