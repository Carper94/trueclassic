/* eslint-disable no-unused-vars */
export default function getCurrentVariantId({ formData, product }) {
  if (product.variants.length === 1) {
    return product.variants[0].id;
  }

  if (product.variants.length > 1) {
    // get all values with [Option-Name, value] pairing
    const options = Array.from(formData.entries()).filter(([key]) => key.match('Option'));
    // get product variant that matches all options
    const variant = product.variants.find((v) => {
      const variantOptions = [v.option1, v.option2, v.option3];
      return options.every(([key, value]) => {
        return variantOptions.includes(value);
      });
    });

    if (variant) {
      return variant.id;
    }
  }
  return null;
}
