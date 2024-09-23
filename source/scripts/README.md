# Granite Scripts
These are a set of house-built, useful, granular JS modules. Use them wherever needed while building out theme functionality.

***

## Components
JS modules that are tightly-coupled to a specific component. 
[README](/components/README.md)

- ***headerController.js*** : Provides mutationObserver for implementing sticky header.
- ***navController.js*** : An opinionated but flexible nav menu pattern.
- ***toaster.js*** : Flexible toast controllers.

***

## Utilities
_Utilities includes various helper functions, DOM tools, etc._

### General Utils
- ***liquidJSON*** : Provides an opinionated method for gathering JSON objects from the page that have been output by Liquid logic, and provides a consistent method for accessing them in JS.
- ***handleize*** : Replicates Shopify's `handleize` Liquid filter in JS

### Accessibility

### Customers

### DOM
- ***generateId.js*** : Generate a unique (and unused on the page) ID attribute value. Can be called without parameters, or optionally pass an object with the following structure: `{ prepend: 'Text to prepend', length: [Integer length of random characters] }`
- ***getCssProp.js*** : Get a computed CSS property from a DOM element. Pass a DOM element and string for which property you want to get: `getCssProp(element, property)`

### Theme-addresses
This is a modified copy of the Shopify theme-addresses package, that will be re-written internally at some point in the future.
