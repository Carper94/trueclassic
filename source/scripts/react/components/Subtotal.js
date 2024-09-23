import { h, Fragment } from 'preact';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function Subtotal({ subtotal }) {
  return <>{formatter.format(subtotal / 100)}</>;
}
