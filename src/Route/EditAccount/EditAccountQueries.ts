import { gql } from 'apollo-boost';

export const EDIT_PROFILE = gql`
  mutation editProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $profilePhoto: String!
  ) {
    UpdateMyProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      profilePhoto: $profilePhoto
    ) {
      ok
      error
    }
  }
`;
