const { gql } = require('graphql-request');

// metafields inputs
// {
//   "metafields": {
//     "key": "",
//     "namespace": "",
//     "ownerId": "",
//     "type": "",
//     "value": ""
//   }
// }

const metafieldsSetMutation = gql`
  mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      userErrors {
        field
        message
      }
    }
  }
`;

module.exports = metafieldsSetMutation;
