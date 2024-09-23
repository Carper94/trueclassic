/**
 * Scripts that are tightly coupled to the index templates -- account, login, register etc
 *
 * Compiles to ./dist/assets/scripts/template.index.js
 */

import { activateSectionToggle } from 'CUSTOMERS/accounts';
import customerAddresses from 'CUSTOMERS/addresses';

activateSectionToggle();
customerAddresses();
