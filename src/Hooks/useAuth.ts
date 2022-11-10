/* eslint-disable @typescript-eslint/no-shadow */
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers, Signer } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Web3Modal from 'web3modal';
import { defaultChainId } from '../Config/AppConfig';
import { JSON_RPC_PROVIDER } from '../Config/ChainConfig';
import {
  setIsUnsupportedChain,
  setNativeCurrencyInfo,
  setTokenList,
} from '../Store/CommonReducer';
import { getChainInfoValue, isSupportedChain } from '../Utils/ChainUtils';
import { initializeReadOnlyProvider } from '../Utils/ContractUtils';
import { abbreviateCurrency } from '../Utils/GeneralUtils';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: JSON_RPC_PROVIDER,
    },
    chainId: 56,
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
  theme: {
    background: '#21262A',
    main: 'rgb(199, 199, 199)',
    secondary: 'rgb(136, 136, 136)',
    border: 'rgba(255, 255, 255, 0.04)',
    hover: 'rgba(255, 255, 255, 0.1)',
  },
});
function useAuth() {
  const dispatch = useDispatch();
  const [web3ModalProvider, setWeb3ModalProvider] = useState<any>();
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<number>(0);
  const [readWriteProvider, setReadWriteProvider] = useState<
    providers.Web3Provider | Signer | undefined
  >();
  const [readOnlyProvider, setReadOnlyProvider] = useState<
    providers.BaseProvider | undefined
  >();

  const setInitialData = () => {
    setChainId(defaultChainId);
  };
  const resetData = () => {
    dispatch(setTokenList([]));
  };

  const reset = () => {
    resetData();
    setWeb3ModalProvider(undefined);
    setReadWriteProvider(undefined);
    setReadOnlyProvider(undefined);
    setAccount('');
    setChainId(0);
    localStorage.removeItem('chainId');
    localStorage.removeItem('walletConnector');
    localStorage.removeItem('account');
  };

  const getNativeBalance = useCallback(
    async (ethersProvider: any, chainId: number, account: string) => {
      const nativeBalance = await ethersProvider.getBalance(account);
      const decimals = +(getChainInfoValue(chainId, 'decimals') || 18);
      dispatch(
        setNativeCurrencyInfo({
          balance: abbreviateCurrency(nativeBalance, decimals),
          decimals,
          quote_rate: 1,
        }),
      );
    },
    [],
  );

  const initialize = useCallback(async (provider: any) => {
    resetData();
    const ethersProvider: providers.Web3Provider = new providers.Web3Provider(
      provider,
    );
    setReadWriteProvider(ethersProvider.getSigner(0));
    localStorage.setItem('walletConnector', ethersProvider.connection.url);
    const { chainId } = await ethersProvider.getNetwork();
    const account = await ethersProvider.listAccounts();
    setAccount(account[0]);
    // setAccount('0x2CB99F193549681e06C6770dDD5543812B4FaFE8');
    if (isSupportedChain(chainId)) {
      setChainId(chainId);
      dispatch(setIsUnsupportedChain(false));
    } else {
      setChainId(defaultChainId);
      dispatch(setIsUnsupportedChain(true));
    }
    getNativeBalance(ethersProvider, chainId, account[0]);
    setReadOnlyProvider(initializeReadOnlyProvider(chainId));
    localStorage.setItem('account', account[0]);
    localStorage.setItem('chainId', chainId.toString());
  }, []);

  const subscribeEvents = useCallback(
    async (provider: any) => {
      provider.on('accountsChanged', () => {
        initialize(provider);
      });
      provider.on('chainChanged', () => {
        initialize(provider);
      });
      provider.on('connect', () => {});
    },
    [initialize],
  );

  const connect = useCallback(async () => {
    const provider = await web3Modal.connect();
    setWeb3ModalProvider(provider);

    initialize(provider);
    subscribeEvents(provider);
  }, [initialize, subscribeEvents]);

  const disconnect = async () => {
    if (web3ModalProvider && web3ModalProvider.close) {
      await web3ModalProvider.close();
    }
    web3Modal.clearCachedProvider();
    reset();
  };
  const handleNetwork = async () => {
    if (typeof readWriteProvider === 'undefined') {
      await connect();
    } else {
      setInitialData();
      await disconnect();
    }
  };
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    } else {
      setInitialData();
    }
  }, [connect]);
  return {
    readWriteProvider,
    readOnlyProvider,
    account,
    chainId,
    handleNetwork,
  };
}
export default useAuth;
