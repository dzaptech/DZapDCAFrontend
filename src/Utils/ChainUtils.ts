import {
  ChainId,
  getChainName,
  getExplorerAddressLink,
  getExplorerTransactionLink,
  shortenIfAddress,
} from '@usedapp/core';
import { hexlify, hexStripZeros } from 'ethers/lib/utils';
import {
  ADD_CHAIN_DATA,
  CHAIN_INFO,
  supportedChains,
} from '../Config/ChainConfig';
import { METAMASK } from '../Constants/AppConstants';
import { Logger } from './Exceptions';
import { errorNotification } from './NotificationUtils';

export const getNetworkName = (chainId: ChainId) => getChainName(chainId);

export const shortAddress = (address: string | undefined) =>
  shortenIfAddress(address);

export const getAddressExplorerLink = (address: string, chainId: number) =>
  getExplorerAddressLink(address, chainId);
export const getHashExplorerLink = (hash: string, chainId: number) =>
  getExplorerTransactionLink(hash, chainId);

export const getChainInfoValue = (chainId: number, key: string | number) =>
  CHAIN_INFO[chainId] ? CHAIN_INFO[chainId][key] : undefined;

export const isSupportedChain = (chainId: number) =>
  supportedChains.includes(chainId);

export const convertDecimalToHexString = (chainId: number) =>
  hexStripZeros(hexlify(chainId));

export const addChain = async (chainId: number) => {
  try {
    const { ethereum } = window;
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [ADD_CHAIN_DATA[chainId]],
    });
  } catch (addError: any) {
    errorNotification('Add Chain', addError.message);
    // handle "add" error
  }
};
export const switchNetwork = async (chainId: number) => {
  try {
    const hexChainId = getChainInfoValue(chainId, 'hexChainId');
    const walletConnector = localStorage.getItem('walletConnector');
    if (walletConnector === METAMASK) {
      const { ethereum } = window;
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
    } else {
      errorNotification(
        'Switch Network',
        "Connector doesn't support chain switching!",
      );
    }
  } catch (switchError: any) {
    Logger.error(switchError, { trxName: 'Switch Network' });
    if (switchError.code === 4902) {
      addChain(chainId);
    } else {
      errorNotification('Switch Network', switchError.message);
    }
  }
};
