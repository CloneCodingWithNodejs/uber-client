import { gql } from 'apollo-boost';

export const PHONE_SIGN_IN = gql`
  mutation startPhoneVerification($PhoneNumber: String!) {
    StartPhoneVerification(phoneNumber: $PhoneNumber) {
      ok
      error
    }
  }
`;
