import { createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import { setIsLoading, setPositions } from '.';
import { defaultChainId } from '../../../../Config/AppConfig';
import apolloClient from '../../../../Services/Apollo/apolloClient';
import { GetAllPositions } from '../../../../Services/Apollo/Queries/graphQueries';
import { apiGetAllTokens } from '../../../../Store/Action';
import { TokenTypes } from '../../../../Types';
import { PositionActions } from '../Constants/enums';

export const getAllPositions = createAsyncThunk(
  'getAllPositions',
  async (
    { account, chainId }: { account: string; chainId: number },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(setIsLoading(true));
    try {
      const { data } = await apolloClient.query({
        query: GetAllPositions,
        variables: {
          id: account.toLowerCase(),
        },
        context: { clientName: defaultChainId },
      });
      const { data: tokenList } = await apiGetAllTokens({ chainId });
      const res = data?.user?.positions || [];
      const rawPositions = res.map((item: any) => {
        const { logo: fromTokenLogo } =
          tokenList.find(
            (token: TokenTypes) =>
              token.contract.toLowerCase() === item.from.id.toLowerCase(),
          ) || {};
        const { logo: toTokenLogo } =
          tokenList.find(
            (token: TokenTypes) =>
              token.contract.toLowerCase() === item.to.id.toLowerCase(),
          ) || {};

        return {
          positionId: +item.id,
          fromToken: {
            symbol: item.from.symbol,
            contract: item.from.id,
            decimals: item.from.decimals,
            logo: fromTokenLogo,
          },
          toToken: {
            symbol: item.to.symbol,
            contract: item.to.id,
            decimals: item.to.decimals,
            logo: toTokenLogo,
          },
          ...item,
        };
      });
      const positions = _.orderBy(rawPositions, ['positionId'], 'desc');
      const activePositions = positions.filter(
        (item: any) => item.status === PositionActions.active,
      );
      const nonActivePositions = positions.filter(
        (item: any) => item.status !== PositionActions.active,
      );
      thunkAPI.dispatch(setIsLoading(false));
      thunkAPI.dispatch(
        setPositions([...activePositions, ...nonActivePositions]),
      );
    } catch (error) {
      console.log('apollo', error);
    }
  },
);
export const trash = () => {};
