import postConfig from '../config/post';

export default async function add(data = { items: [] }) {
  const atcBtn = document.querySelector('#add-to-cart');
  let res;
  let json;
  try {
    if (atcBtn !== null) {
      atcBtn.classList.add('btn-loading');
    }
    res = await fetch('/cart/add.js', {
      ...postConfig,
      body: JSON.stringify(data),
    });

    if (res.ok) {
      json = await res.json();
      return { success: true, res, data: json, error: null };
    }

    // In cases where object out of stock, etc
    if (res.status === 422) {
      json = await res.json();

      return {
        success: false,
        res,
        data: null,
        error: json,
      };
    }

    // All other statuses
    throw new Error('There was a problem adding to cart');
  } catch (error) {
    return {
      success: false,
      res,
      data: null,
      // Aliasing message to description here to match how shopify returns error messages
      error: { ...error, description: error.message },
    };
  } finally {
    if (atcBtn !== null) {
      atcBtn.classList.remove('btn-loading');
    }
  }
}
