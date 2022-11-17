import { Form } from 'antd';
import { BigNumber } from 'ethers';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import AuthContext from '../../../../Context/AuthContext';
import { RootState } from '../../../../Store';
import { TokenTypes } from '../../../../Types';
import {
  abbreviateNumber,
  currencyFormatter,
  formatSecondsToDHM,
} from '../../../../Utils/GeneralUtils';
import { DCA_FORM_FIELD, INVESTMENT_CYCLE } from '../Constants';
import { DCATrxState } from '../Constants/enums';

function useSummary({
  form,
  cycleKey,
  currentFromToken,
  hasAllowance,
}: {
  form: any;
  cycleKey: number;
  currentFromToken: TokenTypes;
  hasAllowance: boolean;
}) {
  const { account, handleNetwork } = useContext(AuthContext);
  const { isUnsupportedChain } = useSelector(
    (state: RootState) => state.common,
  );
  const { trxState } = useSelector((state: RootState) => state.dca);
  const amount = +Form.useWatch(DCA_FORM_FIELD.amount, form) || 0;
  const period = +Form.useWatch(DCA_FORM_FIELD.period, form);
  const swapAmount = amount / (period || 1);
  const balance = +currencyFormatter(
    currentFromToken.balance,
    currentFromToken.decimals,
  );
  const cycle = INVESTMENT_CYCLE[cycleKey].value;
  const isInsufficientFund = balance < amount;
  const investmentPeriod = BigNumber.from(cycle || 0).mul(period || 1);
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
      value: formatSecondsToDHM(investmentPeriod.toNumber()),
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
    } else if (!period) {
      btn = 'ENTER INVESTMENT PERIOD';
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
