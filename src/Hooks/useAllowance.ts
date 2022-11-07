/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { BigNumber } from 'ethers';
import { useContext, useState } from 'react';
import { dcaVersion } from '../Config/AppConfig';
import { STATUS } from '../Constants/AppConstants';
import { DCA_CONTRACTS } from '../Constants/ContractHistory';
import AuthContext from '../Context/AuthContext';
import { initializeERC20TokenContract } from '../Utils/ContractUtils';

function useAllowance() {
  const [hasAllowance, setHasAllowance] = useState<boolean>(false);
  const { readOnlyProvider, chainId, account } = useContext(AuthContext);
  const getAllowance = async (contract: string) => {
    try {
      const contractAddress = DCA_CONTRACTS[dcaVersion][chainId];
      const tokenContract = initializeERC20TokenContract({
        tokenAddress: contract,
        provider: readOnlyProvider,
      });
      const allowance: BigNumber = await tokenContract.allowance(
        account,
        contractAddress,
      );
      setHasAllowance(allowance.gt('0'));
      return { status: STATUS.success, allowance };
    } catch (err: any) {
      return { status: STATUS.error, data: err };
    }
  };
  return {
    getAllowance,
    hasAllowance,
  };
}
export default useAllowance;
