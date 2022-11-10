import { BigNumber } from 'ethers';
import { useContext } from 'react';
import { STATUS } from '../Constants/AppConstants';
import AuthContext from '../Context/AuthContext';
import { initializeERC20TokenContract } from '../Utils/ContractUtils';

function useTokenInfo() {
  const { readOnlyProvider } = useContext(AuthContext);

  const getTokenInfo = async (
    contract: string,
    methods: string[],
    params: any,
  ) => {
    try {
      const data: { [key: string]: number | string | BigNumber } = {};
      const tokenContract = initializeERC20TokenContract({
        tokenAddress: contract,
        provider: readOnlyProvider,
      });
      const result = await Promise.all(
        methods.map(async (method, index) => {
          const res = await tokenContract[method](...params[index]);
          return res;
        }),
      );
      methods.forEach((method, index) => {
        data[method === 'balanceOf' ? 'balance' : method] = result[index];
      });
      return { status: STATUS.success, data };
    } catch (error) {
      return { status: STATUS.error, error };
    }
  };
  return {
    getTokenInfo,
  };
}
export default useTokenInfo;
