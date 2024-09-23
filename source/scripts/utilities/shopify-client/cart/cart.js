export default async function cart() {
  const res = await fetch('/cart.js');
  try {
    const json = await res.json();
    return {
      success: true,
      res,
      data: json,
    };
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
