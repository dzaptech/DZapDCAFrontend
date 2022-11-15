import { BigNumber } from 'ethers';
import { TokenTypes } from '../Types';

export const DECIMAL_PLACES = 2;

export const ERC_20_ABI_PATH = 'erc20-abi.json';
export const LOCAL_STORAGE_TOKEN_LIST_KEY = 'tokenList';

export const STATUS = {
  pending: 'Pending',
  inProgress: 'InProgress',
  success: 'Success',
  rejected: 'Rejected',
  error: 'Error',
};

export const METAMASK = 'metamask';

export const CONTRACT_METHOD = {
  batchSwap: 'swapTokensToTokens',
};

export const APP = {
  dca: 'dca',
};

const sampleToken = {
  symbol: 'USDC',
  contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  name: 'USD Coin (PoS)',
  decimals: 6,
  balance: '0',
  quote_rate: 1,
  logo: 'https://assets.unmarshal.io/tokens/matic_0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174.png',
  verified: false,
  swapRate: 1,
  allowance: BigNumber.from('0'),
};

export const APP_DATA: {
  [key: string]: {
    [key: number]: {
      slippage: number;
      gasMultiplier: [number, number];
      defaultToken: TokenTypes;
      quoteExpiry: number;
    };
  };
} = {
  [APP.dca]: {
    1: {
      slippage: 1,
      gasMultiplier: [15, 10],
      defaultToken: {
        ...sampleToken,
        contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6,
      },
      quoteExpiry: 15,
    },
    56: {
      slippage: 1,
      gasMultiplier: [11, 10],
      defaultToken: {
        ...sampleToken,
        contract: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        decimals: 18,
      },
      quoteExpiry: 12,
    },
    137: {
      slippage: 1,
      gasMultiplier: [12, 10],
      defaultToken: {
        ...sampleToken,
        contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        decimals: 6,
      },
      quoteExpiry: 10,
    },
    80001: {
      slippage: 1,
      gasMultiplier: [12, 10],
      defaultToken: {
        ...sampleToken,
        contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        decimals: 6,
      },
      quoteExpiry: 10,
    },
  },
};
