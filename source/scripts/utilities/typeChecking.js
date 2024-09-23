/*
These utils are meant to simplify, add consistency, and improve overall readability of checking for general types in the js language.

For example, checking for a type of string, number, array, null or a real object in javascript all require different methods & logic.
Here that inner logic has been abstracted away into consistent declaritive names: isString, isNumber, isArray, isNull, isEmptyObj

[For more utility functions or more info see this article](https://webbjocke.com/javascript-check-data-types/)
*/

const isEmptyObj = (obj) => Object.keys(obj).length === 0;

const isIterable = (obj) => (obj == null ? false : typeof obj[Symbol.iterator] === 'function');

const isString = (value) => typeof value === 'string' || value instanceof String;

const isArray = (value) => Array.isArray(value);

// eslint-disable-next-line no-restricted-globals
const isNumber = (value) => typeof value === 'number' && isFinite(value);

// ** note -- usually it's not neccessary to check explicitly for null or undefined since they're both falsy

const isNull = (value) => value === null;

const isUndefined = (value) => typeof value === 'undefined';

const isFunction = (value) => typeof value === 'function';

const isValidJSON = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export {
  isValidJSON,
  isFunction,
  isUndefined,
  isNull,
  isNumber,
  isArray,
  isString,
  isIterable,
  isEmptyObj,
};
