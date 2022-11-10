import { configureStore } from '@reduxjs/toolkit';
import dcaReducer from '../Logic/DCA/Create/Store';
import dcaDashboardReducer from '../Logic/DCA/Dashboard/Store';
import commonReducer from './CommonReducer';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    dca: dcaReducer,
    dcaDashboard: dcaDashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
