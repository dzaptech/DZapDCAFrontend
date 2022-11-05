import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { nativeCurrencyAddresses } from '../Config/ChainConfig';
import { APP, STATUS } from '../Constants/AppConstants';
import AuthContext from '../Context/AuthContext';
import { apiGetAllBalanceOf } from '../Store/Action';
import {
  setNativeCurrencyInfo,
  setWalletTokenList,
} from '../Store/CommonReducer';
import { getDefaultToken } from '../Utils/AppUtils';
import { currencyFormatter } from '../Utils/GeneralUtils';
import { filterBalance } from '../Utils/TokenUtils';

function useBalance() {
  const { account, chainId } = useContext(AuthContext);
  const dispatch = useDispatch();

  const getAllWalletBalances = () => {
    apiGetAllBalanceOf({ address: account || '', chainId }).then(
      async ({ status, data }) => {
        const defaultToken = getDefaultToken(APP.dca, chainId);
        let filteredBalance = data;
        if (status === STATUS.success) {
          const nativeToken =
            filteredBalance.find((item: { contract: string }) =>
              nativeCurrencyAddresses.includes(item.contract),
            ) || {};
          const { balance, decimals, quote_rate: quoteRate } = nativeToken;
          const nativeCurrencyInfo = {
            balance: +currencyFormatter(balance || '0', decimals || 0),
            decimals: 18,
            quote_rate: quoteRate || 1,
          };
          dispatch(setNativeCurrencyInfo(nativeCurrencyInfo));
          filteredBalance = filterBalance(data);
          dispatch(
            setWalletTokenList(
              filteredBalance.length > 0 ? filteredBalance : [defaultToken],
            ),
          );
        } else {
          dispatch(setWalletTokenList([defaultToken]));
        }
      },
    );
  };
  return {
    getAllWalletBalances,
  };
}
export default useBalance;
