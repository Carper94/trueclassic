const { gql } = require('graphql-request');

const productsQuery = gql`
  query productsQuery($after: String) {
    products(first: 100, after: $after) {
      edges {
        node {
          id
          handle
          title
          colorMetafield: metafield(namespace: "colorways", key: "color") {
            value
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

module.exports = productsQuery;
