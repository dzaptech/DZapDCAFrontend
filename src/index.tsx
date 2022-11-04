import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import i18n from './Locales/i18n';
import reportWebVitals from './reportWebVitals';
import { store } from './Store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

const client = new ApolloClient({
  // uri: `${window.location.host}/graphql/`,
  uri: 'http://localhost:9000/graphql/',
  cache: new InMemoryCache({ addTypename: false }),
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
