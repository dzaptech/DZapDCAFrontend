import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Provider } from 'react-redux';
import { AuthProvider } from './Context/AuthContext';
import useAuth from './Hooks/useAuth';
import AppRoutes from './Routes/AppRoutes';
import { store } from './Store';

// const projectPackage = require('../package.json');

// const release = `${projectPackage.version}`;
// const { REACT_APP_SENTRY_DNS } = process.env;

// Sentry.init({
//   dsn: REACT_APP_SENTRY_DNS,
//   integrations: [new BrowserTracing()],
//   release,
//   tracesSampleRate: 1.0,
// });

const dsn =
  'https://6afab1b7244f4dbdb9db8d03bae096c1@o1161266.ingest.sentry.io/6690320';
Sentry.init({
  dsn,
  //   tunnel: 'http://127.0.0.1:8080/purge/token-list',
  integrations: [new Integrations.BrowserTracing()],
});

function App() {
  const {
    readOnlyProvider,
    readWriteProvider,
    handleNetwork,
    chainId,
    account,
  } = useAuth();
  const chainIdLocalStorage = parseInt(
    localStorage.getItem('chainId') || '{}',
    10,
  );

  const value = {
    chainId,
    account,
    readOnlyProvider,
    readWriteProvider,
    handleNetwork,
    chainIdLocalStorage,
  };
  return (
    <Provider store={store}>
      <AuthProvider value={value}>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  );
}

export default App;
