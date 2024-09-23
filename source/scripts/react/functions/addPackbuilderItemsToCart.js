import shopifyClient from 'UTILS/shopify-client';
import { v4 as uuidv4 } from 'uuid';

export default async function addPackbuilderItemsToCart(state) {
  // deep copy
  const timestamp = new Date().getTime() / 1000;
  const key = uuidv4();

  const items = JSON.parse(JSON.stringify(state.items)).map((item, i) => {
    const properties = {
      _bundle: true,
      _key: key,
      _threshold: state.discount.amount / 100,
      _count: state.items.length,
      _time: timestamp,
      _number: i + 1,
    };
    // add line item props
    return { ...item, properties };
  });

  const { success, data, res } = await shopifyClient.add({ items });
  return { success, data, res };
}
