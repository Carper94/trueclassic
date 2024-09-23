/* Get a CSS property for a given DOM element */
const getCssProp = (element, property) => {
  const style = window.getComputedStyle(element);
  return style.getPropertyValue(property).trim();
};

export default getCssProp;
