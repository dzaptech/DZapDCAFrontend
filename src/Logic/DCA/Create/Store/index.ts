import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DCATrxState } from '../Constants/enums';

interface Props {
  trxState: number;
  trxResponse: any;
  isInsufficientGasFee: boolean;
}
const initialState: Props = {
  trxState: DCATrxState.unset,
  trxResponse: undefined,
  isInsufficientGasFee: false,
};

export const multiSwap = createSlice({
  name: 'multiSwap',
  initialState,
  reducers: {
    setTrxResponse: (state, action: PayloadAction<any>) => {
      const currentState = state;
      currentState.trxResponse = action.payload;
    },
    setIsInsufficientGasFee: (state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.isInsufficientGasFee = action.payload;
    },
    setTrxState: (state, action: PayloadAction<number>) => {
      const currentState = state;
      currentState.trxState = action.payload;
    },
  },
});

export const { setTrxResponse, setIsInsufficientGasFee, setTrxState } =
  multiSwap.actions;

export default multiSwap.reducer;
