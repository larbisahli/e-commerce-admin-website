import { gql } from 'graphql-request';

export const GetProductsQuery = gql`
  query ProductPagination(
    $account_uid: ID!
    $category_uid: ID
    $page: Int!
    $limit: Int
  ) {
    Products(
      account_uid: $account_uid
      category_uid: $category_uid
      page: $page
      limit: $limit
    ) {
      product_uid
      category_uid
      account_uid
      title
      price
      thumbnail {
        image_uid
        image
      }
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
      is_new
      note
      thumbnail {
        image_uid
        image
        display_order
      }
      gallery {
        image_uid
        image
        display_order
      }
    }
  }
`;

export const ProductCountQuery = gql`
  {
    ProductsCount {
      count
    }
  }
`;
