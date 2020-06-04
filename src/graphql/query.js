import { gql } from "apollo-boost";

// export const PRODUCT_DETAIL = gql`
//   {
//     query GetProductDistribution($productId:ID){
//       ProductDistributionSearch(productId: $productId) {
//         items {
//           productId
//           distributeTo
//         }
//       }
//     }
//   }
// `;

export const PRODUCT_DETAIL_QUERY = gql`
  {
    ProductDistributionSearch(productId: 2858963) {
      items {
        productId
        distributeTo
      }
    }
  }
`;
