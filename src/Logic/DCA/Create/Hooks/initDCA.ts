import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  LOCAL_STORAGE_TOKEN_LIST_KEY,
  STATUS,
} from '../../../../Constants/AppConstants';
import AuthContext from '../../../../Context/AuthContext';
import useBalance from '../../../../Hooks/useTokenBalance';
import { apiGetAllTokens, getTokensPrice } from '../../../../Store/Action';
import { setTokenList } from '../../../../Store/CommonReducer';
import { isSupportedChain } from '../../../../Utils/ChainUtils';
import { parseJsonString } from '../../../../Utils/GeneralUtils';

function initDCA() {
  const { account, chainId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { getAllWalletBalances } = useBalance();

  useEffect(() => {
    if (isSupportedChain(chainId)) {
      apiGetAllTokens({ chainId }).then((res) => {
        if (res.status === STATUS.success) {
          dispatch(setTokenList(res.data));
        } else {
          dispatch(setTokenList([]));
        }
      });
      const tokenListKey = `${chainId}_${LOCAL_STORAGE_TOKEN_LIST_KEY}`;

      const localStorageTokenList =
        parseJsonString(localStorage.getItem(tokenListKey) || '') || [];
      if (localStorageTokenList.length > 0) {
        const tokenAddresses = localStorageTokenList.map(
          ({ contract }: { contract: string }) => contract,
        );
        getTokensPrice({ tokenAddresses, chainId }).then(({ status, data }) => {
          if (status === STATUS.success) {
            const updatedList = localStorageTokenList.map(
              (item: { contract: string }) => {
                const quoteRate =
                  data.find(
                    ({ contract }: { contract: string }) =>
                      item.contract.toLowerCase() === contract.toLowerCase(),
                  )?.price || 0;
                return {
                  ...item,
                  quote_rate: quoteRate,
                };
              },
            );
            localStorage.setItem(tokenListKey, JSON.stringify(updatedList));
          }
        });
      }
    }
  }, [chainId]);
  useEffect(() => {
    if (account && chainId) {
      getAllWalletBalances();
    }
  }, [account, chainId]);
}
export default initDCA;
