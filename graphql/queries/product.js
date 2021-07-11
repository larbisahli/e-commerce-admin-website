import { gql } from 'graphql-request';

export const GetProductsQuery = gql`
  query getCategory(
    $account_uid: ID!
    $category_uid: ID!
    $page: Int!
    $limit: Int!
  ) {
    Category(
      account_uid: $account_uid
      category_uid: $category_uid
      page: $page
      limit: $limit
    ) {
      product_uid
      title
      price
    }
  }
`;

export const GetProductQuery = gql`
  query getProduct($product_uid: ID!) {
    Product(product_uid: $product_uid) {
      product_uid
      category_uid
      account_uid
      title
      price
      discount
      warehouse_location
      product_description
      short_description
      inventory
      product_weight
      available_sizes
      available_colors
      size
      color
      is_new
      note
    }
  }
`;
