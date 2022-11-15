import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsLoading, setPositions } from '.';
import { defaultChainId } from '../../../../Config/AppConfig';
import apolloClient from '../../../../Services/Apollo/apolloClient';
import { GetAllPositions } from '../../../../Services/Apollo/Queries/graphQueries';
import { getAlternateTokenIcon } from '../../../../Utils/GeneralUtils';

export const getAllPositions = createAsyncThunk(
  'getAllPositions',
  async ({ account }: { account: string }, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    try {
      const { data } = await apolloClient.query({
        query: GetAllPositions,
        variables: {
          id: account.toLowerCase(),
        },
        context: { clientName: defaultChainId },
      });
      const res = data?.user?.positions || [];
      const positions = res.map((item: any) => ({
        positionId: item.id,
        fromToken: {
          symbol: item.from.symbol,
          contract: item.from.id,
          decimals: item.from.decimals,
          logo: getAlternateTokenIcon(),
        },
        toToken: {
          symbol: item.to.symbol,
          contract: item.to.id,
          decimals: item.to.decimals,
          logo: getAlternateTokenIcon(),
        },
        ...item,
      }));
      thunkAPI.dispatch(setIsLoading(false));
      thunkAPI.dispatch(setPositions(positions));
    } catch (error) {
      console.log('apollo', error);
    }
  },
);
export const trash = () => {};
