import { gql } from 'apollo-boost';

export const VERIFY_EMAIL = gql`
  mutation completeEmailVerification($key: String!) {
    CompleteEmailVerification(key: $key) {
      ok
      error
    }
  }
`;
