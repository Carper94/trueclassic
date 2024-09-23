/* eslint-disable camelcase */
import { h } from 'preact';
import sizeText from 'UTILS/sizeText';
import PackBuilderLineItem from './PackBuilderLineItem';

export default function PackBuilderLineItemList({ items }) {
  if (!items.length) {
    return <span class="h2">Select a size to get started</span>;
  }

  return (
    <ul class="pack-builder-line-item-list">
      {items.map(({ id, key, variant, product, quantity }) => {
        const { title } = product;
        const { featured_image } = variant;
        const options = product.options.map((option, i) => {
          const value = variant.options[i];
          if (option === 'Size') {
            return sizeText(value);
          }
          return value;
        });
        return (
          <PackBuilderLineItem
            title={title}
            image={featured_image}
            options={options}
            quantity={quantity}
            // line item key
            k={key}
            // react list key
            key={id}
          />
        );
      })}
    </ul>
  );
}
