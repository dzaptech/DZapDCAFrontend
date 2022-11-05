import Axios from 'axios';
import urls from '../Config/Urls';
import { STATUS } from '../Constants/AppConstants';

export const apiGetAllBalanceOf = ({
  chainId,
  address,
}: {
  chainId: number;
  address: string;
}) =>
  Axios({
    method: 'get',
    url: urls.getAllBalanceOf,
    params: { chainId, address },
  })
    .then((response) => ({ status: STATUS.success, data: response.data }))
    .catch((error) => ({ status: STATUS.error, error, data: [] }));

export const apiGetTokenDetails = ({
  tokenAddress,
  chainId,
}: {
  tokenAddress: string;
  chainId: number;
}): Promise<{ status: string; data?: any; error?: any }> =>
  Axios({
    method: 'get',
    url: urls.getTokenDetails,
    params: { tokenAddress, chainId },
  })
    .then((response) => ({ status: STATUS.success, data: response.data }))
    .catch((error) => ({ status: STATUS.error, error }));

export const getTokensPrice = ({
  tokenAddresses,
  chainId,
}: {
  tokenAddresses: string[];
  chainId: number;
}): Promise<{ status: string; data?: any; error?: any }> =>
  Axios({
    method: 'get',
    url: urls.getTokensPrice,
    params: { tokenAddresses, chainId },
  })
    .then((response) => ({ status: STATUS.success, data: response.data }))
    .catch((error) => ({ status: STATUS.error, error }));

export const apiGetAllTokens = ({
  chainId,
  source,
}: {
  chainId: number;
  source?: string;
}) =>
  Axios({
    method: 'get',
    url: urls.getAllTokens,
    params: { chainId, source },
  })
    .then((response) => ({ status: STATUS.success, data: response.data }))
    .catch((error) => ({ status: STATUS.error, error, data: [] }));
