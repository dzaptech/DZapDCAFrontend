import { BigNumber } from 'ethers';

export interface TokenTypes {
  name: string;
  symbol: string;
  contract: string;
  decimals: number;
  balance: string;
  quote_rate: number;
  logo: string;
  verified: boolean;
  swapRate: number;
  allowance: BigNumber | string;
}

export type ApprovalStatusType = {
  symbol: string;
  contract: string;
  status: string;
  transactionHash?: string;
  logo: string;
};
