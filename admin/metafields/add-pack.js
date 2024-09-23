const fs = require('fs');
const util = require('util');
const shopifyClient = require('../shopify/client');
const { metafieldsSetMutation } = require('../shopify/mutations');
const { productsQuery } = require('../shopify/queries');

const { log, error } = console;

const logFile = fs.createWriteStream(`logs/products-without-pack-metafield-${Date.now()}.log`, {
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

    const packMatch = title.toLowerCase().match(/[0-9]+-pack/);
    const pack = packMatch?.length > 0 ? packMatch[0] : null;

    if (pack) {
      const metafield = pack.replace('p', 'P');
      acc.push({
        namespace: 'custom',
        key: 'pack_size',
        ownerId: id,
        type: 'single_line_text_field',
        value: metafield,
      });
    } else {
      writeLog(`${id} - ${title} | No metafield Added`);
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
