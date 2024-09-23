const isHidden = (el) => {
  const computedStyles = getComputedStyle(el);
  const displayVal = computedStyles.getPropertyValue('display');
  const opacityVal = computedStyles.getPropertyValue('opacity');
  const visibilityVal = computedStyles.getPropertyValue('visibility');
  return displayVal === 'none' || visibilityVal === 'hidden' || opacityVal === '0';
};

export default isHidden;
