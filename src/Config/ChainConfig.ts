import binanceIcon from '../Assets/Icons/binance.svg';
import ethIcon from '../Assets/Icons/ethereum.svg';
import polygonIcon from '../Assets/Icons/polygon.svg';
import { defaultChainId } from './AppConfig';

interface ChainInfoInterface {
  [key: number]: {
    [key: string]: string | number;
  };
}
export type ChainDataType = {
  [key: number]: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
  };
};
export const CHAIN_INFO: ChainInfoInterface = {
  56: {
    symbol: 'BNB',
    chain: 'BSC',
    decimals: 18,
    name: 'BNB Chain',
    icon: binanceIcon,
    hexChainId: '0x38',
  },
  97: {
    symbol: 'BNB',
    chain: 'BSC',
    decimals: 18,
    name: 'BSC Testnet',
    icon: binanceIcon,
    hexChainId: '0x61',
  },
  4: {
    symbol: 'ETH',
    chain: 'ETH',
    decimals: 18,
    name: 'Rinkeby',
    icon: ethIcon,
    hexChainId: '0x4',
  },
  1: {
    symbol: 'ETH',
    chain: 'ETH',
    decimals: 18,
    name: 'Ethereum',
    icon: ethIcon,
    hexChainId: '0x1',
  },
  80001: {
    chain: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    name: 'Mumbai',
    icon: polygonIcon,
    hexChainId: '0x13881',
  },
  137: {
    chain: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    name: 'Polygon',
    icon: polygonIcon,
    hexChainId: '0x89',
  },
};
export const primaryChainId = 137;
export const eFormatNativeCurrency =
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const eFormatNativeCurrency1 =
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const nativeCurrencyAddresses: string[] = [
  '0x0000000000000000000000000000000000001010',
  eFormatNativeCurrency,
  '0x0000000000000000000000000000000000000000',
  eFormatNativeCurrency1,
];
export const supportedChains: number[] = [defaultChainId];
export const alchemyRinkebyApi: string[] = [
  'rinkeby',
  '6Abto5co0LubIKUWva-uq2xpGdUKUc66',
];

export const alchemyMainnetApi: string[] = [
  'homestead',
  'nfrnWAqN2Frs4UJ_hVhF3xiz_eo9fkKd',
];

export const walletConnectBridgeUrl: string =
  'https://bridge.walletconnect.org';

export const useDappConfiguration = {
  readOnlyUrls: {
    56: 'https://bsc-dataseed.binance.org',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
};

export const CHAIN_EXPLORER_LINK = {
  56: 'https://bscscan.com/address/',
  97: 'https://testnet.bscscan.com/address/',
};

export const JSON_RPC_PROVIDER: { [key: number]: string } = {
  1: 'https://rpc.ankr.com/eth',
  56: 'https://rpc.ankr.com/bsc',
  137: 'https://polygon-mainnet.g.alchemy.com/v2/aoOZJKHgcr-qQjBZ-TZyvZXBv4E38Jr7',
};

export const ADD_CHAIN_DATA: ChainDataType = {
  137: {
    chainId: '0x89',
    chainName: 'Matic-Mainnet',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  56: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  97: {
    chainId: '0x61',
    chainName: 'Binance Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com/address/'],
  },
  1: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://etherscan.io/'],
    blockExplorerUrls: ['https://etherscan.io/block/'],
  },
};
