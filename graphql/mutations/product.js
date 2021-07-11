import { gql } from 'graphql-request';

export const CreateProductMutation = gql`
  mutation CreateProduct(
    $category_uid: ID!
    $account_uid: ID!
    $title: String!
    $price: Int!
    $discount: Int
    $warehouse_location: String!
    $product_description: String!
    $short_description: String!
    $inventory: Int!
    $product_weight: Int!
    $available_sizes: [String]
    $available_colors: [String]
    $size: String
    $color: String
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
      available_sizes: $available_sizes
      available_colors: $available_colors
      size: $size
      color: $color
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
    $price: Int!
    $discount: Int
    $warehouse_location: String!
    $product_description: String!
    $short_description: String!
    $inventory: Int!
    $product_weight: Int!
    $available_sizes: [String]
    $available_colors: [String]
    $size: String
    $color: String
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
      available_sizes: $available_sizes
      available_colors: $available_colors
      size: $size
      color: $color
      is_new: $is_new
      note: $note
    ) {
      product_uid
    }
  }
`;
