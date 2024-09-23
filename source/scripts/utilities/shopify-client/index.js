import { add, cart, change, clear, update } from './cart';

const shopifyClient = {
  add,
  cart,
  change,
  clear,
  update,
  remove: (id) => change({ id: `${id}`, quantity: '0' }),
};

window.shopifyClient = shopifyClient;

export default shopifyClient;
