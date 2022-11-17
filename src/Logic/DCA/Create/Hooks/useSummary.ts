import { Form } from 'antd';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import AuthContext from '../../../../Context/AuthContext';
import { RootState } from '../../../../Store';
import { TokenTypes } from '../../../../Types';
import {
  abbreviateNumber,
  currencyFormatter,
} from '../../../../Utils/GeneralUtils';
import {
  DCA_FORM_DEFAULT_VALUES,
  DCA_FORM_FIELD,
  INVESTMENT_CYCLE,
} from '../Constants';
import { DCATrxState } from '../Constants/enums';

function useSummary({
  form,
  cycleKey,
  currentFromToken,
  hasAllowance,
}: {
  form: any;
  cycleKey: string;
  currentFromToken: TokenTypes;
  hasAllowance: boolean;
}) {
  const { account, handleNetwork } = useContext(AuthContext);
  const { isUnsupportedChain } = useSelector(
    (state: RootState) => state.common,
  );
  const { trxState } = useSelector((state: RootState) => state.dca);
  const amount = +Form.useWatch(DCA_FORM_FIELD.amount, form) || 0;
  const period =
    +Form.useWatch(DCA_FORM_FIELD.period, form) ||
    DCA_FORM_DEFAULT_VALUES.period;
  const swapAmount = amount / period;
  const balance = +currencyFormatter(
    currentFromToken.balance,
    currentFromToken.decimals,
  );
  const cycle = INVESTMENT_CYCLE[cycleKey].value;
  const isInsufficientFund = balance < amount;
  const summary = [
    {
      id: 1,
      key: 'Swap amount',
      value: `${abbreviateNumber(swapAmount || 0)} ${currentFromToken.symbol}`,
    },
    {
      id: 2,
      key: 'Recurring cycle',
      value: INVESTMENT_CYCLE[cycleKey].label,
    },
    {
      id: 3,
      key: 'Investment Period',
      value: `${abbreviateNumber(period * cycle)} Days`,
    },
    {
      id: 4,
      key: 'Total Investment Amount',
      value: `${abbreviateNumber(amount)} ${currentFromToken.symbol}`,
    },
  ];
  const { symbol } = currentFromToken;
  let btn: string = 'Create Position';
  let isDisable = true;
  if (account) {
    if (isUnsupportedChain !== undefined && isUnsupportedChain) {
      btn = 'Switch Network';
    } else if (isInsufficientFund) {
      btn = 'INSUFFICIENT FUNDS';
    } else if (amount <= 0) {
      btn = 'ENTER VALID AMOUNT';
    } else {
      if (!hasAllowance) {
        btn = `Approve ${symbol}`;
      }
      isDisable = false;
    }
  } else {
    isDisable = false;
    btn = 'Connect Wallet';
  }

  const onClick = () => {
    if (btn === 'Connect Wallet') {
      handleNetwork();
    }
  };
  return {
    summary,
    isDisable,
    isLoading: trxState !== DCATrxState.unset,
    btn,
    onClick,
  };
}
export default useSummary;
