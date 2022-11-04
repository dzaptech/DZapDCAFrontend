import React from 'react';
import { providers, Signer } from 'ethers';

export type ContextValueType = {
  chainId: number;
  account: string | undefined;
  readOnlyProvider: providers.BaseProvider | undefined;
  readWriteProvider: providers.Web3Provider | Signer | undefined;
  handleNetwork: () => void;
  chainIdLocalStorage: number;
};

const AuthContext = React.createContext<ContextValueType>(
  {} as ContextValueType,
);
export const AuthProvider = AuthContext.Provider;
export default AuthContext;
