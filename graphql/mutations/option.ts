import { gql } from 'graphql-request';

export const CreateOptionMutation = gql`
  mutation CreateOption(
    $attribute_uid: ID!
    $option_name: String!
    $additional_price: Float!
    $color_hex: String
  ) {
    CreateOption(
      attribute_uid: $attribute_uid
      option_name: $option_name
      additional_price: $additional_price
      color_hex: $color_hex
    ) {
      option_name
    }
  }
`;

export const UpdateOptionMutation = gql`
  mutation UpdateOption(
    $option_uid: ID!
    $option_name: String!
    $additional_price: Float!
    $color_hex: String
  ) {
    UpdateOption(
      option_uid: $option_uid
      option_name: $option_name
      additional_price: $additional_price
      color_hex: $color_hex
    ) {
      option_name
    }
  }
`;

export const DeleteOptionMutation = gql`
  mutation DeleteOption($option_uid: ID!) {
    DeleteOption(option_uid: $option_uid) {
      option_name
    }
  }
`;
