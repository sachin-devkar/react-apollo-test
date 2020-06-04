import { gql } from "apollo-boost";
export const UPDATE_DISTRIBUTE_TO_MUTATION = gql`
  mutation UpdateProductDistributionTo($productId: ID, $distributeTo: String!) {
    updateProductDistributionTo(
      input: { productId: $productId, distributeTo: $distributeTo }
    ) {
      status
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProductPhysical($distributeTo: String!, $productId: Int!) {
    createProductPhysical(
      input: { distributeTo: $distributeTo, productId: $productId }
    ) {
      items {
        productDistributionId
        productId
        distributeTo
      }
    }
  }
`;
