import { BigNumber } from 'ethers';
import { TokenTypes } from '../../../../Types';

export const APP = {
  dca: 'dca',
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
