import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsLoading } from '.';
import { defaultChainId } from '../../../../Config/AppConfig';
import apolloClient from '../../../../Services/Apollo/apolloClient';
import { GetAllPositions } from '../../../../Services/Apollo/Queries/graphQueries';

export const getAllPositions = createAsyncThunk(
  'getAllPositions',
  async (_, thunkAPI) => {
    try {
      const result = await apolloClient.query({
        query: GetAllPositions,
        variables: {
          id: '0x6c9a2af2f6c8f808ae6ae89a5b3c80f2414480aa',
        },
        context: { clientName: defaultChainId },
      });
      //   const result = await apolloClient.query({
      //     query: GetAllTokens,
      //     context: { clientName: defaultChainId },
      //   });
      console.log(result);

      // const projectData: any = getProject(chainId, projectId);
      // thunkAPI.dispatch(setProjectDetails(projectData));
      thunkAPI.dispatch(setIsLoading(false));
    } catch (error) {
      console.log('apollo', error);
    }
  },
);
export const trash = () => {};
