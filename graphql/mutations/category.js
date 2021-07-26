import { gql } from 'graphql-request';

export const CreateCategoryMutation = gql`
  mutation CreateCategory(
    $category_name: String!
    $category_description: String!
    $is_active: Boolean!
  ) {
    CreateCategory(
      category_name: $category_name
      category_description: $category_description
      is_active: $is_active
    ) {
      category_uid
      category_name
    }
  }
`;

export const UpdateCategoryMutation = gql`
  mutation UpdateCategory(
    $category_uid: ID!
    $category_name: String!
    $category_description: String!
    $is_active: Boolean!
  ) {
    UpdateCategory(
      category_uid: $category_uid
      category_name: $category_name
      category_description: $category_description
      is_active: $is_active
    ) {
      category_uid
      category_name
    }
  }
`;
