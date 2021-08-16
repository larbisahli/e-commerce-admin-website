import { gql } from 'graphql-request';

export const CreateAttributeMutation = gql`
  mutation CreateAttribute(
    $product_uid: ID!
    $attribute_name: String!
    $options: [OptionInput!]!
  ) {
    CreateAttribute(
      product_uid: $product_uid
      attribute_name: $attribute_name
      options: $options
    ) {
      attribute_name
    }
  }
`;

export const UpdateAttributeMutation = gql`
  mutation UpdateAttribute($attribute_uid: ID!, $attribute_name: String!) {
    UpdateAttribute(
      attribute_uid: $attribute_uid
      attribute_name: $attribute_name
    ) {
      attribute_name
    }
  }
`;
