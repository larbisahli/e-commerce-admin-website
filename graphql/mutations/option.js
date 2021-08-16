import { gql } from 'graphql-request';

export const DeleteOptionMutation = gql`
  mutation DeleteOption($option_uid: ID!) {
    DeleteOption(option_uid: $option_uid) {
      option_name
    }
  }
`;
