import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Props {
  positions: [];
  isLoading: boolean;
}
const initialState: Props = {
  positions: [],
  isLoading: true,
};

export const multiSwap = createSlice({
  name: 'multiSwap',
  initialState,
  reducers: {
    setPositions: (state, action: PayloadAction<any>) => {
      const currentState = state;
      currentState.positions = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<any>) => {
      const currentState = state;
      currentState.isLoading = action.payload;
    },
  },
});

export const { setPositions, setIsLoading } = multiSwap.actions;

export default multiSwap.reducer;
