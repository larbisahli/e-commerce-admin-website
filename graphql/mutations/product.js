import { gql } from 'graphql-request';

export const CreateProductMutation = gql`
  mutation CreateProduct(
    $category_uid: ID!
    $account_uid: ID!
    $title: String!
    $price: Int!
    $discount: Int
    $shipping_price: Int!
    $warehouse_location: String!
    $product_description: String!
    $short_description: String!
    $quantity: Int!
    $product_weight: Int
    $available_sizes: String
    $available_colors: String
    $size: String
    $color: String
    $is_new: Boolean!
  ) {
    CreateProduct(
      category_uid: $category_uid
      account_uid: $account_uid
      title: $title
      price: $price
      discount: $discount
      shipping_price: $shipping_price
      warehouse_location: $warehouse_location
      product_description: $product_description
      short_description: $short_description
      quantity: $quantity
      product_weight: $product_weight
      available_sizes: $available_sizes
      available_colors: $available_colors
      size: $size
      color: $color
      is_new: $is_new
    ) {
      product_uid
    }
  }
`;

export const UpdateProductMutation = gql`
  mutation UpdateProduct(
    $product_uid: ID!
    $title: String!
    $price: Int!
    $discount: Int
    $shipping_price: Int!
    $warehouse_location: String!
    $product_description: String!
    $short_description: String!
    $quantity: Int!
    $product_weight: Int
    $available_sizes: String
    $available_colors: String
    $size: String
    $color: String
    $is_new: Boolean!
  ) {
    UpdateProduct(
      product_uid: $product_uid
      title: $title
      price: $price
      discount: $discount
      shipping_price: $shipping_price
      warehouse_location: $warehouse_location
      product_description: $product_description
      short_description: $short_description
      quantity: $quantity
      product_weight: $product_weight
      available_sizes: $available_sizes
      available_colors: $available_colors
      size: $size
      color: $color
      is_new: $is_new
    ) {
      product_uid
    }
  }
`;
