/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./source/scripts/sections/pack-builder.js":
/*!*************************************************!*\
  !*** ./source/scripts/sections/pack-builder.js ***!
  \*************************************************/
/***/ (function() {

eval("// import { h, render } from 'preact';\n// import PackBuilderApp from '../react/PackBuilderApp';\n\n// render(<PackBuilderApp />, document.body);\n\n//# sourceURL=webpack://true-classic/./source/scripts/sections/pack-builder.js?");

/***/ }),

/***/ "./source/scripts/snippets/pack-builder-cart.js":
/*!******************************************************!*\
  !*** ./source/scripts/snippets/pack-builder-cart.js ***!
  \******************************************************/
/***/ (function() {

eval("function handleCartToggleButtonClick(e) {\n  if (e.target.dataset.delegate === 'packbuildercarttoggle') {\n    const packBuilderCartListWrapper = document.querySelector('.pack-builder-cart__list-wrapper');\n    packBuilderCartListWrapper.classList.toggle('active');\n    e.target.classList.toggle('active');\n    if (e.target.ariaExpanded === true) {\n      e.target.setAttribute('aria-expanded', false);\n    } else {\n      e.target.setAttribute('aria-expanded', true);\n    }\n  }\n}\ndocument.addEventListener('click', handleCartToggleButtonClick);\n\n//# sourceURL=webpack://true-classic/./source/scripts/snippets/pack-builder-cart.js?");

/***/ }),

/***/ "./source/scripts/templates/template.collection.packbuilder.js":
/*!*********************************************************************!*\
  !*** ./source/scripts/templates/template.collection.packbuilder.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sections_pack_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sections/pack-builder */ \"./source/scripts/sections/pack-builder.js\");\n/* harmony import */ var _sections_pack_builder__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sections_pack_builder__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _snippets_pack_builder_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../snippets/pack-builder-cart */ \"./source/scripts/snippets/pack-builder-cart.js\");\n/* harmony import */ var _snippets_pack_builder_cart__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_snippets_pack_builder_cart__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack://true-classic/./source/scripts/templates/template.collection.packbuilder.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./source/scripts/templates/template.collection.packbuilder.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=template.collection.packbuilder.js.map?v=e998451008c4b8ca67d3fb888be210bc