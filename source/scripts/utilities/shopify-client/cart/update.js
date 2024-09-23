import postConfig from '../config/post';

/**
 * Pass the update method an object in the following format:
 *
 * {
 *   updates: {
 *     productId: quantity,
 *     ...
 *   }
 * }
 *
 */
export default async function update(data = { updates: {} }) {
  let res;
  let json;
  try {
    res = await fetch('/cart/update.js', { ...postConfig, body: JSON.stringify(data) });
    if (res.ok) {
      json = await res.json();
      // The response is only the JSON from the line items added
      // Add a new prop for success
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
