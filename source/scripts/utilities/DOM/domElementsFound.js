import { isDomEl, isNodeList, isHTMLCollection, isArrayOfElements } from 'DOM/domTypeChecking';

// helper util to simplify checking for successful DOM queries and
// generally make code easier to reason about
// will return true if provided arg is of type Element,
// NodeList/HTMLCollection with length > 0,  or an array of Elements

const domElementsFound = (arg) =>
  isDomEl(arg) || isNodeList(arg) || isHTMLCollection(arg) || isArrayOfElements(arg);

export default domElementsFound;
