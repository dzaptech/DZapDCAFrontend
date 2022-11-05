/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenTypes } from '../Types';

interface NativeCurrencyInfoType {
  decimals: number;
  balance: number;
  quote_rate: number;
}
type Props = {
  isUnsupportedChain: boolean | undefined;
  tokenList: TokenTypes[];
  walletTokenList: TokenTypes[];
  nativeCurrencyInfo: NativeCurrencyInfoType;
  isTokenModal: boolean;
  editTokenContract: string;
  isCombineTokenList: boolean;
  tokenShimmerSize: number;
};

const initialState: Props = {
  isUnsupportedChain: undefined,
  tokenList: [],
  walletTokenList: [],
  nativeCurrencyInfo: {
    decimals: 18,
    balance: 0,
    quote_rate: 1,
  },
  isTokenModal: false,
  editTokenContract: '',
  isCombineTokenList: false,
  tokenShimmerSize: 0,
};

export const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsUnsupportedChain: (state, action: PayloadAction<boolean>) => {
      state.isUnsupportedChain = action.payload;
    },
    setIsTokenModal: (state, action: PayloadAction<boolean>) => {
      state.isTokenModal = action.payload;
    },
    setNativeCurrencyInfo: (
      state,
      action: PayloadAction<NativeCurrencyInfoType>,
    ) => {
      state.nativeCurrencyInfo = action.payload;
    },
    setTokenList: (state, action: PayloadAction<TokenTypes[]>) => {
      state.tokenList = action.payload;
    },
    setWalletTokenList: (state, action: PayloadAction<TokenTypes[]>) => {
      state.walletTokenList = action.payload;
    },
    setEditTokenContract: (state, action: PayloadAction<string>) => {
      const currentState = state;
      currentState.editTokenContract = action.payload;
    },
    setIsCombineTokenList: (state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.isCombineTokenList = action.payload;
    },
    setTokenShimmerSize: (state, action: PayloadAction<any>) => {
      const currentState = state;
      currentState.tokenShimmerSize = action.payload;
    },
  },
});

export const {
  setIsUnsupportedChain,
  setNativeCurrencyInfo,
  setTokenList,
  setIsTokenModal,
  setWalletTokenList,
  setEditTokenContract,
  setIsCombineTokenList,
  setTokenShimmerSize,
} = common.actions;

export default common.reducer;
