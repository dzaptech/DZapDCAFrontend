import { configureStore } from '@reduxjs/toolkit';
import dcaReducer from '../Logic/DCA/Create/Store';
import commonReducer from './CommonReducer';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    dca: dcaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
