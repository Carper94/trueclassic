import postConfig from '../config/post';

export default async function clear() {
  let res;
  let json;
  try {
    res = await fetch('/cart/clear.js', { ...postConfig });
    if (res.ok) {
      json = await res.json();
      return { success: true, res, data: json, error: null };
    }
    if (res.status === 422) {
      json = await res.json();
      return {
        success: false,
        res,
        data: null,
        error: json,
      };
    }
    // all other statuses
    throw new Error('There was a problem updating cart');
  } catch (error) {
    return {
      success: false,
      res,
      data: null,
      // aliasing message to description here to match how shopify returns error messages
      error: { ...error, description: error.message },
    };
  }
}
