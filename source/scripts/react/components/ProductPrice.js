import { h, Fragment } from 'preact';
import formatter from 'UTILS/currency/formatter';

function formatCurrency(value) {
  let currencySymbol;
  if (window.theme.moneyCode === 'US') {
    currencySymbol = `${window.theme.moneySymbolUs}${formatter.format(value)}`;
  } else if (window.theme.moneyCode === 'GB') {
    currencySymbol = `${window.theme.moneySymbolUs}${formatter.format(value)}`;
  } else if (window.theme.moneySymbolUs === '€') {
    currencySymbol = `${window.theme.moneySymbolUs}${formatter.format(value)}`;
  } else {
    currencySymbol = `${window.theme.moneyCode}
    ${window.theme.moneySymbolUs}${formatter.format(value)}`;
  }
  return currencySymbol;
}

function ProductPrice({ id, price, discountedPrice, compareAtPrice }) {
  if (discountedPrice != null && price > discountedPrice) {
    return (
      <>
        {' '}
        <span class="visually-hidden">Regular price</span>
        <s class="price price--full" data-product-id={id}>
          <span class="pri">{formatCurrency(price)}</span>
        </s>
        <span class="visually-hidden">{'Discounted price'}</span>
        <span class="price price--discount bold" data-product-id={id}>
          <span class="pri">{formatCurrency(discountedPrice)}</span>
        </span>
      </>
    );
  }

  if (compareAtPrice > price) {
    return (
      <>
        <span class="visually-hidden">{'Regular price'}</span>
        <s class="price price--full" data-product-id={id}>
          <span class="pri">{formatCurrency(compareAtPrice)}</span>
        </s>
        <span class="visually-hidden">{'Discounted price'}</span>
        <span class="price price--discount bold" data-product-id={id}>
          <span class="pri">{formatCurrency(price)}</span>
        </span>
      </>
    );
  }

  return (
    <span class="price" data-product-id={id}>
      {formatCurrency(price)}
    </span>
  );
}

export default ProductPrice;
