import { gql } from 'apollo-boost';

export const SIGN_UP = gql`
  mutation signUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $profilePhoto: String!
    $age: Int!
    $phoneNumber: String!
    $fbId: String
  ) {
    SignUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      profilePhoto: $profilePhoto
      age: $age
      phoneNumber: $phoneNumber
      fbId: String
    ) {
      ok
      error
      token
    }
  }
`;
