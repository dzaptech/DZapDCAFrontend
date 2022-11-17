import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dcaVersion } from '../../../../Config/AppConfig';
import { APP, STATUS } from '../../../../Constants/AppConstants';
import { DCA_CONTRACTS } from '../../../../Constants/ContractHistory';
import { TrxType } from '../../../../Constants/enums';
import AuthContext from '../../../../Context/AuthContext';
import { RootState } from '../../../../Store';
import { setTrxType } from '../../../../Store/CommonReducer';
import { getGasMultiplier } from '../../../../Utils/AppUtils';
import { initializeContract } from '../../../../Utils/ContractUtils';
import { errorNotification } from '../../../../Utils/NotificationUtils';
import { DCATrxState } from '../../Create/Constants/enums';
import { setTrxResponse, setTrxState } from '../../Create/Store';
import { ActionType } from '../Constants/enums';
import { setActionParams, setActionType } from '../Store';

function useActions() {
  const { chainId, readWriteProvider } = useContext(AuthContext);
  const dispatch = useDispatch<any>();
  const { actionParams, actionType } = useSelector(
    (state: RootState) => state.dcaDashboard,
  );
  const gasMultiplier: [number, number] = getGasMultiplier(APP.dca, chainId);

  const getContract = () => {
    const abiPath = DCA_CONTRACTS[dcaVersion].abi;
    const contractAddress = DCA_CONTRACTS[dcaVersion][chainId];
    return initializeContract({
      contractAddress,
      abiPath,
      provider: readWriteProvider,
    });
  };
  const initTrxData = (params: any[], type: number) => {
    dispatch(setActionParams(params));
    dispatch(setTrxResponse(undefined));
    dispatch(setActionType(type));
    dispatch(setTrxType(TrxType.blockchainWrite));
    dispatch(setTrxState(DCATrxState.wait));
  };
  const terminate = async (params: any[]) => {
    try {
      initTrxData(params, ActionType.terminate);
      const contract = getContract();
      const estimateGas = await contract.estimateGas.terminate(...params);
      const result = await contract.terminate(...params, {
        gasLimit: estimateGas.mul(gasMultiplier[0]).div(gasMultiplier[1]),
      });
      const res = await result.wait();
      dispatch(setTrxResponse({ status: STATUS.success, data: res }));
    } catch (error: any) {
      dispatch(setTrxResponse({ status: STATUS.error, data: error }));
      errorNotification(
        'Error',
        error?.error?.data?.message || 'Something went wrong!',
      );
    }
  };
  const withdraw = async (params: any[]) => {
    try {
      initTrxData(params, ActionType.withdrawSwapped);
      const contract = getContract();
      const estimateGas = await contract.estimateGas.withdrawSwapped(...params);
      const result = await contract.withdrawSwapped(...params, {
        gasLimit: estimateGas.mul(gasMultiplier[0]).div(gasMultiplier[1]),
      });
      const res = await result.wait();
      dispatch(setTrxResponse({ status: STATUS.success, data: res }));
    } catch (error: any) {
      dispatch(setTrxResponse({ status: STATUS.error, data: error }));
      errorNotification(
        'Error',
        error?.error?.data?.message || 'Something went wrong!',
      );
    }
  };
  const modifyPosition = async (params: any[]) => {
    try {
      initTrxData(params, ActionType.modify);
      const contract = getContract();
      const estimateGas = await contract.estimateGas.modifyPosition(...params);
      const result = await contract.modifyPosition(...params, {
        gasLimit: estimateGas.mul(gasMultiplier[0]).div(gasMultiplier[1]),
      });
      const res = await result.wait();
      dispatch(setTrxResponse({ status: STATUS.success, data: res }));
    } catch (error: any) {
      dispatch(setTrxResponse({ status: STATUS.error, data: error }));
      errorNotification(
        'Error',
        error?.error?.data?.message || 'Something went wrong!',
      );
    }
  };
  const retry = () => {
    if (actionType === ActionType.terminate) {
      terminate(actionParams);
    } else if (actionType === ActionType.withdrawSwapped) {
      withdraw(actionParams);
    } else {
      modifyPosition(actionParams);
    }
  };

  return {
    terminate,
    modifyPosition,
    retry,
    withdraw,
  };
}

export default useActions;
