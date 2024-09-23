const fs = require('fs');
const util = require('util');
const shopifyClient = require('../shopify/client');
const { metafieldsSetMutation } = require('../shopify/mutations');
const { productsQuery } = require('../shopify/queries');
const colorNames = require('./colorNames');

const { log, error } = console;

const logFile = fs.createWriteStream(`logs/products-without-color-metafield-${Date.now()}.log`, {
  flags: 'a',
});
const logStdout = process.stdout;

const writeLog = (...args) => {
  logFile.write(`${util.format.apply(null, args)}\n`);
  logStdout.write(`${util.format.apply(null, args)}\n`);
};

async function getProductsBatch(params) {
  let res;

  try {
    res = await shopifyClient.request(productsQuery, params);
  } catch (err) {
    error('There was a problem sending request', err);
  }

  return res;
}

async function getAllProducts() {
  const allProducts = [];
  let res;
  const params = {};
  let hasNextPage = true;
  let pageInfo;

  while (hasNextPage) {
    // eslint-disable-next-line no-await-in-loop
    res = await getProductsBatch(params);
    // log(res);
    pageInfo = res.products.pageInfo;
    hasNextPage = pageInfo.hasNextPage;
    allProducts.push(...res.products.edges);
    // eslint-disable-next-line no-param-reassign
    params.after = pageInfo.endCursor;
  }

  return allProducts;
}

function generateMetafields(products) {
  return products.reduce((acc, product) => {
    const { title, id } = product.node;

    const titleString = title.toLowerCase();
    // eslint-disable-next-line no-array-constructor
    const colorMatches = new Array();

    colorNames.forEach((color) => {
      // Match exact words (ex. don't match "tan" if title has "standard")
      if (titleString.match(`\\b${color}\\b`)) {
        colorMatches.push(color);
      }
    });

    const hasColorMatch = !!colorMatches.length;

    if (hasColorMatch) {
      // There can only be one correct color per product
      // Therefore, the longest match is always correct
      // Ex. title has "cardinal red" so matches "red" and "cardinal red"
      const metafield = colorMatches.sort((a, b) => {
        return b.length - a.length;
      })[0];
      // Capitalize each word
      const metafieldCapitalized = metafield.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );

      acc.push({
        namespace: 'colorways',
        key: 'color',
        ownerId: id,
        type: 'single_line_text_field',
        value: metafieldCapitalized,
      });
    } else {
      writeLog(`${id} - ${title} | No metafield added`);
    }

    return acc;
  }, []);
}

async function setMetafield(metafield) {
  try {
    await shopifyClient.request(metafieldsSetMutation, {
      metafields: metafield,
    });
    log('Added: ', metafield);
  } catch (err) {
    error('There was a problem setting metafield', err);
  }
}

(async () => {
  const allProducts = await getAllProducts();
  const newMetafields = generateMetafields(allProducts);

  log(newMetafields);
  if (!newMetafields) return;

  await newMetafields.reduce(async (prev, metafield) => {
    await prev;
    await setMetafield(metafield);
  }, Promise.resolve());

  log('Done setting metafields');
})();
