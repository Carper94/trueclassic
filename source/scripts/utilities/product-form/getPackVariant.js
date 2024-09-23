export default function getCurrentPackVariantId(packProduct, currentVariant) {
  // Get pack variant based on current selected product variant
  const packVariant = packProduct.variants.find((variant) => {
    return (
      variant.option1 === currentVariant.option1 &&
      variant.option2 === currentVariant.option2 &&
      variant.option3 === currentVariant.option3
    );
  });

  return packVariant.id || null;
}
