/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { useContext } from 'react';
import { dcaVersion } from '../Config/AppConfig';
import { STATUS } from '../Constants/AppConstants';
import { DCA_CONTRACTS } from '../Constants/ContractHistory';
import AuthContext from '../Context/AuthContext';
import { initializeERC20TokenContract } from '../Utils/ContractUtils';
import { Logger } from '../Utils/Exceptions';
import {
  errorNotification,
  successNotification,
} from '../Utils/NotificationUtils';

function useApprove() {
  const { readWriteProvider, chainId } = useContext(AuthContext);
  const approve = async (contract: string, isRemove = false) => {
    try {
      const contractAddress = DCA_CONTRACTS[dcaVersion][chainId];
      const tokenContract = initializeERC20TokenContract({
        tokenAddress: contract,
        provider: readWriteProvider,
      });
      const approvalResult = await tokenContract.approve(
        contractAddress,
        isRemove ? 0 : await tokenContract.totalSupply(),
      );
      const res = await approvalResult.wait();
      successNotification(
        'Approve',
        `${await tokenContract.symbol()} ${
          isRemove ? 'Approval removed' : 'approved'
        } successfully`,
      );
      return { status: STATUS.success, data: res };
    } catch (err: any) {
      errorNotification('Approve', err?.message);
      Logger.error(err, { trxName: 'Approve' });
      return { status: STATUS.error, data: err };
    }
  };
  return {
    approve,
  };
}
export default useApprove;
