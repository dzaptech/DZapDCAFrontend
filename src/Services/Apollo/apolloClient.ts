import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { defaultChainId, GRAPH_API } from '../../Config/AppConfig';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
  query: {
    fetchPolicy: 'no-cache',
  },
};

const endpoint1 = new HttpLink({
  uri: GRAPH_API[defaultChainId],
});

const endpoint2 = new HttpLink({
  uri: GRAPH_API[137],
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === defaultChainId,
    endpoint1,
    endpoint2,
  ),
  defaultOptions,
});

export default apolloClient;
