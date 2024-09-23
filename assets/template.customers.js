/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/scripts/templates/template.customers.js":
/*!********************************************************!*\
  !*** ./source/scripts/templates/template.customers.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var CUSTOMERS_accounts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! CUSTOMERS/accounts */ \"./source/scripts/utilities/customers/accounts.js\");\n/* harmony import */ var CUSTOMERS_addresses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! CUSTOMERS/addresses */ \"./source/scripts/utilities/customers/addresses.js\");\n/**\n * Scripts that are tightly coupled to the index templates -- account, login, register etc\n *\n * Compiles to ./dist/assets/scripts/template.index.js\n */\n\n\n\n(0,CUSTOMERS_accounts__WEBPACK_IMPORTED_MODULE_0__.activateSectionToggle)();\n(0,CUSTOMERS_addresses__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n//# sourceURL=webpack://true-classic/./source/scripts/templates/template.customers.js?");

/***/ }),

/***/ "./source/scripts/utilities/customers/accounts.js":
/*!********************************************************!*\
  !*** ./source/scripts/utilities/customers/accounts.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"activateSectionToggle\": function() { return /* binding */ activateSectionToggle; },\n/* harmony export */   \"toggleAccountTabs\": function() { return /* binding */ toggleAccountTabs; }\n/* harmony export */ });\n/* harmony import */ var pickoneitem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pickoneitem */ \"./node_modules/pickoneitem/pickOne.js\");\n\nlet tabGroup;\nconst selectors = {\n  accountSection: '[data-account-section]',\n  sectionToggle: '[data-account-toggle]'\n};\nfunction toggleAccountTabs(event) {\n  const active = event.target.closest(selectors.accountSection);\n  const forgotPasswordForm = document.querySelector('#recover-email');\n  tabGroup.clear(); // Remove .hide from recover and login form\n\n  if (active) {\n    tabGroup.pick(active); // Hide previously active form\n    forgotPasswordForm.focus();\n  }\n}\nfunction activateSectionToggle() {\n  const toggle = document.querySelectorAll(selectors.sectionToggle);\n  if (!toggle) return;\n  tabGroup = (0,pickoneitem__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  tabGroup.init({\n    className: 'hide',\n    group: selectors.accountSection\n  });\n  toggle.forEach(button => {\n    button.addEventListener('click', toggleAccountTabs);\n  });\n}\n\n//# sourceURL=webpack://true-classic/./source/scripts/utilities/customers/accounts.js?");

/***/ }),

/***/ "./source/scripts/utilities/customers/addresses.js":
/*!*********************************************************!*\
  !*** ./source/scripts/utilities/customers/addresses.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var UTILITIES_theme_addresses__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! UTILITIES/theme-addresses */ \"./source/scripts/utilities/theme-addresses/theme-addresses.js\");\n/**\n * Customer Addresses Script\n * ------------------------------------------------------------------------------\n * A file that contains scripts highly coupled to the Customer Addresses\n * template.\n *\n * @namespace customerAddresses\n */\n\n\nconst selectors = {\n  addressContainer: '[data-address]',\n  addressFields: '[data-address-fields]',\n  addressToggle: '[data-address-toggle]',\n  addressForm: '[data-address-form]',\n  addressDeleteForm: '[data-address-delete-form]'\n};\nconst hideClass = 'hide';\nconst handleFormToggle = addressForm => {\n  addressForm.classList.toggle(hideClass);\n};\nconst initializeAddressForm = container => {\n  const addressFields = container.querySelector(selectors.addressFields);\n  const addressForm = container.querySelector(selectors.addressForm);\n  const deleteForm = container.querySelector(selectors.addressDeleteForm);\n  container.querySelectorAll(selectors.addressToggle).forEach(button => {\n    button.addEventListener('click', () => {\n      const expanded = button.getAttribute('aria-expanded') === 'true' || false;\n      button.setAttribute('aria-expanded', !expanded);\n      handleFormToggle(addressForm);\n    });\n  });\n  (0,UTILITIES_theme_addresses__WEBPACK_IMPORTED_MODULE_0__.AddressForm)(addressFields, 'en');\n  if (deleteForm) {\n    deleteForm.addEventListener('submit', event => {\n      const confirmMessage = deleteForm.getAttribute('data-confirm-message');\n\n      // TODO: Refactor this at some point to create a DOM warning\n      // eslint-disable-next-line no-alert\n      if (!window.confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {\n        event.preventDefault();\n      }\n    });\n  }\n};\nconst customerAddresses = () => {\n  const addressForms = document.querySelectorAll(selectors.addressContainer);\n  if (addressForms.length) {\n    addressForms.forEach(addressContainer => {\n      initializeAddressForm(addressContainer);\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (customerAddresses);\n\n//# sourceURL=webpack://true-classic/./source/scripts/utilities/customers/addresses.js?");

/***/ }),

/***/ "./source/scripts/utilities/theme-addresses/addressForm.js":
/*!*****************************************************************!*\
  !*** ./source/scripts/utilities/theme-addresses/addressForm.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ AddressForm; }\n/* harmony export */ });\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ \"./source/scripts/utilities/theme-addresses/loader.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./source/scripts/utilities/theme-addresses/helpers.js\");\n/* eslint no-prototype-builtins: 0 */\n\n\nvar FIELD_REGEXP = /({\\w+})/g;\nvar LINE_DELIMITER = '_';\nvar INPUT_SELECTORS = {\n  lastName: '[name=\"address[last_name]\"]',\n  firstName: '[name=\"address[first_name]\"]',\n  company: '[name=\"address[company]\"]',\n  address1: '[name=\"address[address1]\"]',\n  address2: '[name=\"address[address2]\"]',\n  country: '[name=\"address[country]\"]',\n  zone: '[name=\"address[province]\"]',\n  postalCode: '[name=\"address[zip]\"]',\n  city: '[name=\"address[city]\"]',\n  phone: '[name=\"address[phone]\"]'\n};\nfunction AddressForm(rootEl, locale, options) {\n  locale = locale || 'en';\n  options = options || {\n    inputSelectors: {}\n  };\n  var formElements = loadFormElements(rootEl, (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.mergeObjects)(INPUT_SELECTORS, options.inputSelectors));\n  validateElements(formElements);\n  return loadShippingCountries(options.shippingCountriesOnly).then(function (shippingCountryCodes) {\n    return (0,_loader__WEBPACK_IMPORTED_MODULE_0__.loadCountries)(locale).then(function (countries) {\n      init(rootEl, formElements, filterCountries(countries, shippingCountryCodes));\n    });\n  });\n}\n\n/**\n * Runs when countries have been loaded\n */\nfunction init(rootEl, formElements, countries) {\n  populateCountries(formElements, countries);\n  var selectedCountry = formElements.country.input ? formElements.country.input.value : null;\n  setEventListeners(rootEl, formElements, countries);\n  handleCountryChange(rootEl, formElements, selectedCountry, countries);\n  placeHolder(formElements);\n}\nfunction placeHolder(formElements) {\n  var formString = Object.keys(formElements);\n  for (let index = 0; index < formString.length; index++) {\n    var defaultValue = formElements[formString[index]].input.getAttribute('value');\n    if (!defaultValue) {\n      formElements[formString[index]].input.placeholder = formString[index];\n    }\n  }\n}\n\n/**\n * Handles when a country change: set labels, reorder fields, populate zones\n */\nfunction handleCountryChange(rootEl, formElements, countryCode, countries) {\n  var country = getCountry(countryCode, countries);\n  setLabels(formElements, country);\n  reorderFields(rootEl, formElements, country);\n  populateZones(formElements, country);\n}\n\n/**\n * Sets up event listener for country change\n */\nfunction setEventListeners(rootEl, formElements, countries) {\n  formElements.country.input.addEventListener('change', function (event) {\n    handleCountryChange(rootEl, formElements, event.target.value, countries);\n  });\n}\n\n/**\n * Reorder fields in the DOM and add data-attribute to fields given a country\n */\nfunction reorderFields(rootEl, formElements, country) {\n  var formFormat = country.formatting.edit;\n  var countryWrapper = formElements.country.wrapper;\n  var afterCountry = false;\n  getOrderedField(formFormat).forEach(function (row) {\n    row.forEach(function (line) {\n      formElements[line].wrapper.dataset.lineCount = row.length;\n      if (!formElements[line].wrapper) {\n        return;\n      }\n      if (line === 'country') {\n        afterCountry = true;\n        return;\n      }\n      if (afterCountry) {\n        rootEl.append(formElements[line].wrapper);\n      } else {\n        rootEl.insertBefore(formElements[line].wrapper, countryWrapper);\n      }\n    });\n  });\n}\n\n/**\n * Update labels for a given country\n */\nfunction setLabels(formElements, country) {\n  Object.keys(formElements).forEach(function (formElementName) {\n    formElements[formElementName].labels.forEach(function (label) {\n      label.textContent = country.labels[formElementName];\n    });\n  });\n}\n\n/**\n * Add right countries in the dropdown for a given country\n */\nfunction populateCountries(formElements, countries) {\n  var countrySelect = formElements.country.input;\n  var duplicatedCountrySelect = countrySelect.cloneNode(true);\n  var countryCodeKey = [];\n  countries.forEach(function (country) {\n    var optionElement = document.createElement('option');\n    optionElement.value = country.code;\n    optionElement.textContent = country.name;\n    duplicatedCountrySelect.appendChild(optionElement);\n    countryCodeKey[country.name] = country.code;\n  });\n  countrySelect.innerHTML = duplicatedCountrySelect.innerHTML;\n  if (countrySelect.dataset.default) {\n    var defaultValue = countrySelect.dataset.default;\n    if (defaultValue.length > 2 && countryCodeKey.hasOwnProperty(defaultValue)) {\n      defaultValue = countryCodeKey[defaultValue];\n    }\n    countrySelect.value = defaultValue;\n  }\n}\n\n/**\n * Add right zones in the dropdown for a given country\n */\nfunction populateZones(formElements, country) {\n  var zoneEl = formElements.zone;\n  if (!zoneEl) {\n    return;\n  }\n  if (country.zones.length === 0) {\n    zoneEl.wrapper.dataset.ariaHidden = 'true';\n    zoneEl.input.innerHTML = '';\n    return;\n  }\n  zoneEl.wrapper.dataset.ariaHidden = 'false';\n  var zoneSelect = zoneEl.input;\n  var duplicatedZoneSelect = zoneSelect.cloneNode(true);\n  duplicatedZoneSelect.innerHTML = '';\n  var zoneCodeKey = [];\n  country.zones.forEach(function (zone) {\n    var optionElement = document.createElement('option');\n    optionElement.value = zone.code;\n    optionElement.textContent = zone.name;\n    duplicatedZoneSelect.appendChild(optionElement);\n    zoneCodeKey[zone.name] = zone.code;\n  });\n  zoneSelect.innerHTML = duplicatedZoneSelect.innerHTML;\n  if (zoneSelect.dataset.default) {\n    var defaultValue = zoneSelect.dataset.default;\n    if (defaultValue.length > 2 && zoneCodeKey.hasOwnProperty(defaultValue)) {\n      defaultValue = zoneCodeKey[defaultValue];\n    }\n    zoneSelect.value = defaultValue;\n  }\n}\n\n/**\n * Will throw if an input or a label is missing from the wrapper\n */\nfunction validateElements(formElements) {\n  Object.keys(formElements).forEach(function (elementKey) {\n    var element = formElements[elementKey].input;\n    var labels = formElements[elementKey].labels;\n    if (!element) {\n      return;\n    }\n    if (typeof element !== 'object') {\n      throw new TypeError(formElements[elementKey] + ' is missing an input or select.');\n    } else if (typeof labels !== 'object') {\n      throw new TypeError(formElements[elementKey] + ' is missing a label.');\n    }\n  });\n}\n\n/**\n * Given an countryCode (eg. 'CA'), will return the data of that country\n */\nfunction getCountry(countryCode, countries) {\n  countryCode = countryCode || 'CA';\n  return countries.filter(function (country) {\n    return country.code === countryCode;\n  })[0];\n}\n\n/**\n * Given a format (eg. \"{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{country}{province}{zip}_{phone}\")\n * will return an array of how the form needs to be formatted, eg.:\n * =>\n * [\n *   ['firstName', 'lastName'],\n *   ['company'],\n *   ['address1'],\n *   ['address2'],\n *   ['city'],\n *   ['country', 'province', 'zip'],\n *   ['phone']\n * ]\n */\nfunction getOrderedField(format) {\n  return format.split(LINE_DELIMITER).map(function (fields) {\n    var result = fields.match(FIELD_REGEXP);\n    if (!result) {\n      return [];\n    }\n    return result.map(function (fieldName) {\n      var newFieldName = fieldName.replace(/[{}]/g, '');\n      switch (newFieldName) {\n        case 'zip':\n          return 'postalCode';\n        case 'province':\n          return 'zone';\n        default:\n          return newFieldName;\n      }\n    });\n  });\n}\n\n/**\n * Given a rootEl where all `input`s, `select`s, and `labels` are nested, it\n * will returns all form elements (wrapper, input and labels) of the form.\n * See `FormElements` type for details\n */\nfunction loadFormElements(rootEl, inputSelectors) {\n  var elements = {};\n  Object.keys(INPUT_SELECTORS).forEach(function (inputKey) {\n    var input = rootEl.querySelector(inputSelectors[inputKey]);\n    elements[inputKey] = input ? {\n      wrapper: input.parentElement,\n      input: input,\n      labels: document.querySelectorAll('[for=\"' + input.id + '\"]')\n    } : {};\n  });\n  return elements;\n}\n\n/**\n * If shippingCountriesOnly is set to true, will return the list of countries the\n * shop ships to. Otherwise returns null.\n */\nfunction loadShippingCountries(shippingCountriesOnly) {\n  if (!shippingCountriesOnly) {\n    // eslint-disable-next-line no-undef\n    return Promise.resolve(null);\n  }\n  var response = fetch(location.origin + '/meta.json');\n  return response.then(function (res) {\n    return res.json();\n  }).then(function (meta) {\n    // If ships_to_countries has * in the list, it means the shop ships to\n    // all countries\n    return meta.ships_to_countries.indexOf('*') !== -1 ? null : meta.ships_to_countries;\n  }).catch(function () {\n    return null;\n  });\n}\n\n/**\n * Only returns countries that are in includedCountryCodes\n * Returns all countries if no includedCountryCodes is passed\n */\nfunction filterCountries(countries, includedCountryCodes) {\n  if (!includedCountryCodes) {\n    return countries;\n  }\n  return countries.filter(function (country) {\n    return includedCountryCodes.indexOf(country.code) !== -1;\n  });\n}\n\n//# sourceURL=webpack://true-classic/./source/scripts/utilities/theme-addresses/addressForm.js?");

/***/ }),

/***/ "./source/scripts/utilities/theme-addresses/helpers.js":
/*!*************************************************************!*\
  !*** ./source/scripts/utilities/theme-addresses/helpers.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mergeObjects\": function() { return /* binding */ mergeObjects; }\n/* harmony export */ });\nfunction mergeObjects() {\n  var to = Object({});\n  for (var index = 0; index < arguments.length; index++) {\n    var nextSource = arguments[index];\n    if (nextSource) {\n      for (var nextKey in nextSource) {\n        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {\n          to[nextKey] = nextSource[nextKey];\n        }\n      }\n    }\n  }\n  return to;\n}\n\n//# sourceURL=webpack://true-classic/./source/scripts/utilities/theme-addresses/helpers.js?");

/***/ }),

/***/ "./source/scripts/utilities/theme-addresses/loader.js":
/*!************************************************************!*\
  !*** ./source/scripts/utilities/theme-addresses/loader.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SUPPORTED_LOCALES\": function() { return /* binding */ SUPPORTED_LOCALES; },\n/* harmony export */   \"loadCountries\": function() { return /* binding */ loadCountries; },\n/* harmony export */   \"toSupportedLocale\": function() { return /* binding */ toSupportedLocale; }\n/* harmony export */ });\nvar query = 'query countries($locale: SupportedLocale!) {' + '  countries(locale: $locale) {' + '    name' + '    code' + '    labels {' + '      address1' + '      address2' + '      city' + '      company' + '      country' + '      firstName' + '      lastName' + '      phone' + '      postalCode' + '      zone' + '    }' + '    formatting {' + '      edit' + '    }' + '    zones {' + '      name' + '      code' + '    }' + '  }' + '}';\nvar GRAPHQL_ENDPOINT = 'https://country-service.shopifycloud.com/graphql';\nfunction loadCountries(locale) {\n  var response = fetch(GRAPHQL_ENDPOINT, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Access-Control-Allow-Origin': '*'\n    },\n    body: JSON.stringify({\n      query: query,\n      operationName: 'countries',\n      variables: {\n        locale: toSupportedLocale(locale)\n      }\n    })\n  });\n  return response.then(function (res) {\n    return res.json();\n  }).then(function (countries) {\n    return countries.data.countries;\n  });\n}\nvar DEFAULT_LOCALE = 'EN';\nvar SUPPORTED_LOCALES = ['DA', 'DE', 'EN', 'ES', 'FR', 'IT', 'JA', 'NL', 'PT', 'PT_BR'];\nfunction toSupportedLocale(locale) {\n  var supportedLocale = locale.replace(/-/, '_').toUpperCase();\n  if (SUPPORTED_LOCALES.indexOf(supportedLocale) !== -1) {\n    return supportedLocale;\n  } else if (SUPPORTED_LOCALES.indexOf(supportedLocale.substring(0, 2)) !== -1) {\n    return supportedLocale.substring(0, 2);\n  } else {\n    return DEFAULT_LOCALE;\n  }\n}\n\n//# sourceURL=webpack://true-classic/./source/scripts/utilities/theme-addresses/loader.js?");

/***/ }),

/***/ "./source/scripts/utilities/theme-addresses/theme-addresses.js":
/*!*********************************************************************!*\
  !*** ./source/scripts/utilities/theme-addresses/theme-addresses.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AddressForm\": function() { return /* reexport safe */ _addressForm__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _addressForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addressForm */ \"./source/scripts/utilities/theme-addresses/addressForm.js\");\n\n\n\n//# sourceURL=webpack://true-classic/./source/scripts/utilities/theme-addresses/theme-addresses.js?");

/***/ }),

/***/ "./node_modules/pickoneitem/pickOne.js":
/*!*********************************************!*\
  !*** ./node_modules/pickoneitem/pickOne.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Function factory to allow an easy method to set a class on\n * only the desired elements of a set\n * @version 1.1.0\n * @type {Object}\n */\n\n /**\n  * Config\n  */\nlet config = {\n  lastTarget: false,\n  group: false,\n  className: false,\n  offClassName: false,\n  invert: false,\n}\n\n/**\n * Dispatches custom events\n */\nconst fireEvent = (name, entry) => {\n  const event = new CustomEvent(name, {\n    bubbles: true,\n    detail: entry,\n  });\n\n  entry.dispatchEvent(event);\n};\n\n/**\n * Test if a variable is iterable\n * @param  {*}  obj\n * @return {Boolean}\n */\nfunction isIterable(obj) {\n  if (obj == null) return false;\n\n  return typeof obj[Symbol.iterator] === 'function';\n}\n\n/**\n * Accept a string, DOM element, or NodeList, and return an array of elements\n * @param  {*} elements\n * @return {Array}\n */\nconst collectElements = function(elements) {\n  let collectedElements = [];\n\n  if (typeof elements === 'string') {\n    elements = document.querySelectorAll(elements);\n  }\n\n  if (isIterable(elements)) {\n    collectedElements = Array.from(elements);\n  } else if (elements instanceof Element || elements instanceof HTMLDocument) {\n    collectedElements = [elements];\n  }\n\n  return collectedElements;\n}\n\n/**\n * Add a class to an element or set of elements\n */\nconst addClass = function(elements, className, offClassName = false) {\n  const elementArray = collectElements(elements);\n\n  elementArray.forEach((element) => {\n    element.classList.add(className);\n\n    if (offClassName) {\n      element.classList.remove(offClassName);\n    }\n\n    fireEvent('classAdded', element);\n  });\n}\n\n/**\n * Add an element to the group\n */\nconst addToGroup = function(elements) {\n  const elementArray = collectElements(elements);\n\n  elementArray.forEach((element) => {\n    if (!this.config.group.includes(element)) {\n      this.config.group.push(element);\n    }\n  });\n}\n\n/**\n * Set the group\n */\nconst setGroup = function(group) {\n  this.config.group = collectElements(group);\n}\n\n/**\n * Remove the desired class from all elements of the group\n */\nconst removeClass = (elements, className, offClassName = false) => {\n  if (!elements || !className) return false;\n\n  const elementArray = collectElements(elements);\n\n  elementArray.forEach((element) => {\n    if (element.classList.contains(className)) {\n      element.classList.remove(className);\n\n      if (offClassName) {\n        element.classList.add(offClassName);\n      }\n\n      fireEvent('classRemoved', element);\n    }\n  });\n}\n\n/**\n * Add the desired class to an element or elements\n */\nconst pick = function(target) {\n  const targetElements = collectElements(target);\n\n  // Short-circuit if no target is picked\n  if (!targetElements || targetElements.length < 1) return false;\n\n  // Remove class from the group\n  if (this.config.group) {\n    if (this.config.invert) {\n      this.addClass(this.config.group, this.config.className, this.config.offClassName);\n    } else {\n      this.removeClass(this.config.group, this.config.className, this.config.offClassName);\n    }\n  }\n\n  // Add class to the target(s)\n  if (this.config.invert) {\n    this.removeClass(targetElements, this.config.className, this.config.offClassName);\n  } else {\n    this.addClass(targetElements, this.config.className, this.config.offClassName);\n  }\n\n  this.config.lastTarget = targetElements;\n\n  // Add target to the group, if not included\n  this.addToGroup(this.config.lastTarget);\n}\n\n/**\n * Remove the class from a subset or all items\n */\nconst clear = function(target = false) {\n  if (target) {\n    target = collectElements(target);\n    this.removeClass(target, this.config.className);\n  } else {\n    this.removeClass(this.config.group, this.config.className);\n  }\n}\n\n/**\n * Initialize the object\n */\nconst init = function(options) {\n  // Merge passed options with default configuration\n  this.config = Object.assign({}, this.config, options);\n\n  this.setGroup(this.config.group);\n\n  return this;\n};\n\n/**\n * Function factory\n */\nconst pickOne = () => ({\n  config,\n  pick,\n  init,\n  addClass,\n  removeClass,\n  setGroup,\n  addToGroup,\n  clear,\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (pickOne);\n\n\n//# sourceURL=webpack://true-classic/./node_modules/pickoneitem/pickOne.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./source/scripts/templates/template.customers.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=template.customers.js.map?v=071d6cc5b94ea8be8b3e3a190cf2d976