import { BigNumber } from 'ethers';
import { TokenTypes } from '../../../../Types';

export const DCA_FORM_FIELD = {
  fromToken: 'fromToken',
  toToken: 'toToken',
  amount: 'amount',
  period: 'period',
  cycle: 'cycle',
};

export const DCA_FORM_DEFAULT_VALUES = {
  fromToken: 'fromToken',
  toToken: 'toToken',
  amount: 0.1,
  period: 5,
  cycle: 14400,
};

export const INVESTMENT_PERIOD = [
  {
    value: 5,
    label: '5',
  },
  {
    value: 15,
    label: '15',
  },
  {
    value: 30,
    label: '30',
  },
];

export const INVESTMENT_CYCLE: {
  [key: string]: {
    value: number;
    label: string;
  };
} = {
  120: {
    value: 120,
    label: '2 min',
  },
  300: {
    value: 300,
    label: '5 min',
  },
  600: {
    value: 600,
    label: '10 min',
  },
  14400: {
    value: 14400,
    label: '4 hours',
  },
  86400: {
    value: 86400,
    label: 'Daily',
  },
  604800: {
    value: 604800,
    label: 'Weekly',
  },
};
export const SECONDARY_TOKEN: { [key: number]: TokenTypes } = {
  1: {
    contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    logo: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
    quote_rate: 1,
    verified: true,
    balance: '0',
    swapRate: 1,
    allowance: BigNumber.from('0'),
  },
  56: {
    contract: '0x55d398326f99059ff775485246999027b3197955',
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 18,
    logo: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
    quote_rate: 1,
    verified: true,
    balance: '0',
    swapRate: 1,
    allowance: BigNumber.from('0'),
  },
  137: {
    contract: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    logo: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
    quote_rate: 1,
    verified: true,
    balance: '0',
    swapRate: 1,
    allowance: BigNumber.from('0'),
  },
};
