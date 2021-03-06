import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat, Operation, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { toast } from 'react-toastify';

const isDev = process.env.NODE_ENV === 'development';
console.log(isDev);

const getToken = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    return token;
  } else {
    return '';
  }
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      'X-JWT': getToken()
    }
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: isDev
    ? 'https://uber-clonekhj.herokuapp.com/graphql'
    : 'https://uber-clonekhj.herokuapp.com/graphql'
});

const wsLink = new WebSocketLink({
  options: {
    connectionParams: {
      'X-JWT': getToken()
    },
    reconnect: true
  },
  uri: isDev
    ? 'wss://uber-clonekhj.herokuapp.com/subscription'
    : 'wss://uber-clonekhj.herokuapp.com/subscription'
});

// 첫번째 함수가 true이면
// wsLink를 false면 httpLink를 실행함

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpected error: ${message}`);
      return null;
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults: {
    auth: {
      __typename: 'Auth',
      isLoggedIn: Boolean(localStorage.getItem('jwt'))
    }
  },
  resolvers: {
    Mutation: {
      logUserIn: (_, { token }, { cache: appCache }) => {
        localStorage.setItem('jwt', token);
        appCache.writeData({
          data: {
            auth: {
              __typename: 'Auth',
              isLoggedIn: true
            }
          }
        });
        return null;
      },
      logUserOut: (_, __, { cache: appCache }) => {
        localStorage.removeItem('jwt');
        appCache.writeData({
          data: {
            auth: {
              __typename: 'Auth',
              isLoggedIn: false
            }
          }
        });
        return null;
      }
    }
  }
});

// apollo client Server를 만든다
// 사용할 캐쉬, 그리고 거대한 링크를 만듬
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    concat(authMiddleware, combinedLinks)
  ])
});

export default client;
