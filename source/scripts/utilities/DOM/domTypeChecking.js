const isDomEl = (obj) => obj instanceof Element;

const isNodeList = (arg) =>
  Object.prototype.isPrototypeOf.call(NodeList.prototype, arg) && arg.length >= 1;

const isHTMLCollection = (arg) =>
  Object.prototype.isPrototypeOf.call(HTMLCollection.prototype, arg) && arg.length >= 1;

const isArrayOfElements = (arg) => Array.isArray(arg) && arg.every(isDomEl);

const isNodeType = (obj, type) => isDomEl(obj) && obj.nodeName === type;

export { isDomEl, isNodeList, isHTMLCollection, isArrayOfElements, isNodeType };
