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

const endpoint = new HttpLink({
  uri: GRAPH_API[defaultChainId],
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === defaultChainId,
    endpoint,
  ),
  defaultOptions,
});

export default apolloClient;
