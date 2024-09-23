/**
 * Scripts that are tightly coupled to the product template
 *
 * Compiles to  ./dist/assets/scripts/template.product.js
 */

import { load } from '@shopify/theme-sections';
import '../sections/product';
import '../snippets/product-gallery';

load('*');
