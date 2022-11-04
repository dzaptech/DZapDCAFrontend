import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import UnsupportedChainModal from './Components/Wallet/UnsupportedChainModal';
import { AuthProvider } from './Context/AuthContext';
import useAuth from './Hooks/useAuth';
import AppRoutes from './Routes/AppRoutes';
import { RootState, store } from './Store';
import { unsupportedChainHandler } from './Store/CommonReducer';
import { isSupportedChain } from './Utils/ChainUtils';

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (chainId) {
      dispatch(unsupportedChainHandler(!isSupportedChain(chainId)));
    }
  }, [chainId]);
  const { isUnsupportedChain } = useSelector(
    (state: RootState) => state.common,
  );
  Sentry.configureScope((scope) => {
    scope.setUser({ account });
  });

  return (
    <Provider store={store}>
      {isUnsupportedChain && <UnsupportedChainModal />}
      <AuthProvider value={value}>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  );
}

export default App;
