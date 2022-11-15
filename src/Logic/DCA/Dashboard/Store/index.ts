import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultChainId } from '../../../../Config/AppConfig';
import { ActionType } from '../Constants/enums';

interface Props {
  positions: [];
  isLoading: boolean;
  actionType: number;
  chainFilter: number[];
  actionParams: any[];
}
const initialState: Props = {
  positions: [],
  isLoading: false,
  chainFilter: [defaultChainId],
  actionType: ActionType.terminate,
  actionParams: [],
};
export const dcaDashboard = createSlice({
  name: 'dcaDashboard',
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
    setActionType: (state, action: PayloadAction<number>) => {
      const currentState = state;
      currentState.actionType = action.payload;
    },
    setActionParams: (state, action: PayloadAction<any[]>) => {
      const currentState = state;
      currentState.actionParams = action.payload;
    },
  },
});

export const {
  setPositions,
  setIsLoading,
  setChainFilter,
  setActionParams,
  setActionType,
} = dcaDashboard.actions;

export default dcaDashboard.reducer;
