import { h, Fragment } from 'preact';
import { createPortal } from 'preact/compat';

export default function Portal({ children, selector }) {
  const el = document.querySelector(selector);
  if (!el) return null;
  if (!selector) throw new Error('Valid selector must be provided');
  el.innerHTML = '';
  return <>{createPortal(children, el)}</>;
}
