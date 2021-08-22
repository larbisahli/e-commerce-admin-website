import { gql } from 'graphql-request';

export const CreateProductMutation = gql`
  mutation CreateProduct(
    $category_uid: ID!
    $account_uid: ID!
    $title: String!
    $price: Float!
    $discount: Float
    $warehouse_location: String!
    $product_description: String!
    $short_description: String!
    $inventory: Int!
    $product_weight: Float!
    $is_new: Boolean!
    $note: String
  ) {
    CreateProduct(
      category_uid: $category_uid
      account_uid: $account_uid
      title: $title
      price: $price
      discount: $discount
      warehouse_location: $warehouse_location
      product_description: $product_description
      short_description: $short_description
      inventory: $inventory
      product_weight: $product_weight
      is_new: $is_new
      note: $note
    ) {
      product_uid
    }
  }
`;

export const UpdateProductMutation = gql`
  mutation UpdateProduct(
    $product_uid: ID!
    $category_uid: ID!
    $title: String!
    $price: Float!
    $discount: Float
    $warehouse_location: String!
    $product_description: String!
    $short_description: String!
    $inventory: Int!
    $product_weight: Float!
    $is_new: Boolean!
    $note: String
  ) {
    UpdateProduct(
      product_uid: $product_uid
      category_uid: $category_uid
      title: $title
      price: $price
      discount: $discount
      warehouse_location: $warehouse_location
      product_description: $product_description
      short_description: $short_description
      inventory: $inventory
      product_weight: $product_weight
      is_new: $is_new
      note: $note
    ) {
      product_uid
    }
  }
`;

export const UpdateImageOrderMutation = gql`
  mutation UpdateImageOrder($image_uid: ID!, $display_order: Int!) {
    UpdateImageOrder(image_uid: $image_uid, display_order: $display_order) {
      display_order
    }
  }
`;
