import { useDispatch, useSelector } from 'react-redux';
import errorGas from '../../../../Assets/Designs/gas.svg';
import success from '../../../../Assets/Icons/approved.svg';
import failed from '../../../../Assets/Icons/failed.svg';
import rejected from '../../../../Assets/Icons/rejected.png';
import waiting from '../../../../Assets/Loader/pulse-ring.svg';
import { STATUS } from '../../../../Constants/AppConstants';
import { TrxType } from '../../../../Constants/enums';
import { RootState } from '../../../../Store';
import { DCATrxState } from '../../Create/Constants/enums';
import { setTrxResponse, setTrxState } from '../../Create/Store';

function useTrx() {
  const { trxResponse } = useSelector((state: RootState) => state.dca);
  const { nativeCurrencyInfo, trxType } = useSelector(
    (state: RootState) => state.common,
  );
  const dispatch = useDispatch();

  const { balance: nativeBalance } = nativeCurrencyInfo;
  const isInsufficientGasFee = nativeBalance === 0;

  const { status, data } = trxResponse || { status: '', data: {} };
  const { reason: errorMessage } = data || {};

  let head;
  let message;
  let headIcon = isInsufficientGasFee ? errorGas : waiting;
  let closable = isInsufficientGasFee;
  if (isInsufficientGasFee) {
    head = 'Insufficient gas fee';
    message =
      'Oops! You don’t have enough tokens to pay for the Gas Fee. Please add some tokens and Try Again';
  } else if (status === STATUS.success) {
    headIcon = success;
  } else if (status === STATUS.error) {
    closable = true;
    if (errorMessage === 'user rejected transaction') {
      headIcon = rejected;
      head = 'Transaction Rejected';
      message =
        'Whoopsie, Swap Rejected in Wallet! Try Again and Click on confirm when prompted in your wallet.';
    } else {
      headIcon = failed;
      head = 'Transaction Failed';
      message =
        'Position Creation Failed! Check "Transaction Details" while we investigate.';
    }
  } else {
    if (trxType === TrxType.approving) {
      head = 'APPROVING';
    }
    if (trxType === TrxType.blockchainWrite) {
      head = 'TRX IN PROGRESS';
    }
    message = 'You transaction is being processed...';
  }

  const onDismiss = () => {
    if (closable) {
      dispatch(setTrxResponse(undefined));
      dispatch(setTrxState(DCATrxState.unset));
    }
  };
  const onFinish = () => {
    dispatch(setTrxResponse(undefined));
    dispatch(setTrxState(DCATrxState.unset));
  };
  return {
    headIcon,
    onDismiss,
    head,
    message,
    status,
    closable,
    data,
    onFinish,
  };
}
export default useTrx;
