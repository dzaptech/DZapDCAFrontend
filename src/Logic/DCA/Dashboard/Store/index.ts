import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultChainId } from '../../../../Config/AppConfig';

interface Props {
  positions: [];
  isLoading: boolean;
  chainFilter: number[];
}
const initialState: Props = {
  positions: [],
  isLoading: true,
  chainFilter: [defaultChainId],
};

export const multiSwap = createSlice({
  name: 'multiSwap',
  initialState,
  reducers: {
    setPositions: (state, action: PayloadAction<any>) => {
      const currentState = state;
      currentState.positions = action.payload;
    },
    setChainFilter: (state, action: PayloadAction<number[]>) => {
      const currentState = state;
      currentState.chainFilter = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<any>) => {
      const currentState = state;
      currentState.isLoading = action.payload;
    },
  },
});

export const { setPositions, setIsLoading, setChainFilter } = multiSwap.actions;

export default multiSwap.reducer;
