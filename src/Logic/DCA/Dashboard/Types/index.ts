import { TokenTypes } from '../../../../Types';

export interface PositionHistoryType {
  id: string;
  action: string;
  transactionHash: string;
  createdAtTimestamp: string;
  fromAmount: string;
  toAmount: string;
  rate: string;
  remainingSwaps: string;
  prevRate: string;
  prevRemainingSwaps: string;
  withdrawn: string;
}

export interface TimelineType {
  history: PositionHistoryType[];
  tokenInfo: { fromToken: TokenTypes; toToken: TokenTypes };
}
