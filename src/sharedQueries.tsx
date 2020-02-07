import { gql } from 'apollo-boost';

// @client를 입력하면 백엔드 서버까지가지않고 apolo서버에서 처리함

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
