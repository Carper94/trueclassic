export default function getVariant({ variantId, product }) {
  return product.variants.find((v) => v.id === variantId);
}
