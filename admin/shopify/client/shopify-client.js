require('dotenv').config();
const { request, GraphQLClient } = require('graphql-request');

const endpoint = `https://${process.env.SHOPIFY_STOREFRONT_DOMAIN}/admin/api/${process.env.SHOPIFY_ADMIN_API_VERSION}/graphql.json`;

const headers = {
  'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN,
};

const shopifyClient = new GraphQLClient(endpoint, { headers });

module.exports = shopifyClient;
