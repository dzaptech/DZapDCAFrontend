import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { dcaVersion } from '../Config/AppConfig';
import { nativeCurrencyAddresses } from '../Config/ChainConfig';
import { APP, ERC_20_ABI_PATH, STATUS } from '../Constants/AppConstants';
import { DCA_CONTRACTS } from '../Constants/ContractHistory';
import AuthContext from '../Context/AuthContext';
import { apiGetAllBalanceOf } from '../Store/Action';
import {
  setNativeCurrencyInfo,
  setWalletTokenList,
} from '../Store/CommonReducer';
import { TokenTypes } from '../Types';
import { getDefaultToken } from '../Utils/AppUtils';
import { currencyFormatter } from '../Utils/GeneralUtils';
import useMulticall from './useMulticall';

function useBalance() {
  const { account, chainId } = useContext(AuthContext);
  const { multicall } = useMulticall();
  const dispatch = useDispatch();

  const mapAllowance = async (list: TokenTypes[]) => {
    try {
      const contracts: string[] = [];
      list.forEach(
        (item) =>
          !nativeCurrencyAddresses.includes(item.contract) &&
          contracts.push(item.contract),
      );
      const spender = DCA_CONTRACTS[dcaVersion][chainId];
      const allowanceData: any = await multicall(
        chainId,
        contracts,
        ERC_20_ABI_PATH,
        'allowance',
        [account, spender],
      );
      const updatedList = [...list];
      contracts.forEach((contract: string, index: number) => {
        const itemIndex = updatedList.findIndex(
          (item: TokenTypes) => item.contract === contract,
        );
        if (index >= 0) {
          updatedList[itemIndex].allowance = allowanceData[index];
        }
      });
      return updatedList;
    } catch (error) {
      return list;
    }
  };

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
          filteredBalance = await mapAllowance(filteredBalance);
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
