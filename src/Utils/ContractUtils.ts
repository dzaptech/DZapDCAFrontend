/* eslint-disable import/no-dynamic-require */
import { ethers, providers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import erc20Abi from '../Artifacts/erc20-abi.json';
import { JSON_RPC_PROVIDER } from '../Config/ChainConfig';

export type ProviderType =
  | ethers.providers.Provider
  | ethers.Signer
  | undefined;
export const getChecksumAddress = (address: string) =>
  ethers.utils.getAddress(address);
export const readWriteProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
};

export const isAddress = (address: string) => {
  try {
    return ethers.utils.getAddress(address);
  } catch {
    return false;
  }
};
export const initializeReadOnlyProvider = (chainId: number) => {
  if (JSON_RPC_PROVIDER[chainId]) {
    return new providers.JsonRpcProvider(JSON_RPC_PROVIDER[chainId]);
  }
  return providers.getDefaultProvider();
};

export const initializeERC20TokenContract = ({
  tokenAddress,
  provider,
}: {
  tokenAddress: string;
  provider: ProviderType;
}) =>
  new ethers.Contract(getChecksumAddress(tokenAddress), erc20Abi.abi, provider);

export const initializeContract: ({
  contractAddress,
  abiPath,
  provider,
}: {
  contractAddress: string;
  abiPath: string;
  provider?: ProviderType;
}) => ethers.Contract = ({ contractAddress, abiPath, provider }) => {
  // eslint-disable-next-line global-require
  const ABI = require(`../Artifacts/${abiPath}`).abi;
  return new ethers.Contract(
    getChecksumAddress(contractAddress),
    ABI,
    provider,
  );
};

export const parseUnitsInWei = (amount: number | string, decimals: number) =>
  parseUnits(amount.toString(), decimals).toString();

export const getInterface = (abiPath: string) => {
  // eslint-disable-next-line global-require
  const { abi } = require(`../Artifacts/${abiPath}`);
  return new ethers.utils.Interface(abi);
};

export const getPastEvent = async (contract: any, provider: any, data: any) => {
  try {
    const { blocks, filterParams, event } = data;
    let filter = contract.filters[event](...filterParams);
    filter = {
      ...filter,
      ...blocks,
    };
    const res = await provider.getLogs(filter);
    return res;
  } catch (error) {
    console.log('getPastEvent', error);
    return error;
  }
};
