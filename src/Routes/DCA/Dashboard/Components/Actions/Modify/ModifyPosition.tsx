import { Form, Modal } from 'antd';
import { useContext, useEffect, useState } from 'react';
import '../../../../../../Assets/Css/DCA/Create.scss';
import { nativeCurrencyAddresses } from '../../../../../../Config/ChainConfig';
import { STATUS } from '../../../../../../Constants/AppConstants';
import AuthContext from '../../../../../../Context/AuthContext';
import useTokenInfo from '../../../../../../Hooks/useTokenInfo';
import {
  DCA_FORM_DEFAULT_VALUES,
  DCA_FORM_FIELD,
} from '../../../../../../Logic/DCA/Dashboard/Constants';
import { parseUnitsInWei } from '../../../../../../Utils/ContractUtils';
import { currencyFormatter } from '../../../../../../Utils/GeneralUtils';
import InvestmentAmount from './Widgets/InvestmentAmount';
import InvestmentPeriod from './Widgets/InvestmentPeriod';
import Summary from './Widgets/Summary';
import TokenInfo from './Widgets/TokenInfo';

function ModifyPosition({
  positionInfo,
  modifyPosition,
  setPositionInfo,
}: {
  positionInfo: any;
  modifyPosition: Function;
  setPositionInfo: Function;
}) {
  const { getTokenInfo } = useTokenInfo();
  const { fromToken, toToken } = positionInfo;
  const { account } = useContext(AuthContext);

  const [tokenBalance, setTokenBalance] = useState(0);
  const getBalance = async () => {
    const resposne = await getTokenInfo(
      fromToken.contract,
      ['balanceOf'],
      [[account]],
    );
    if (resposne.status === STATUS.success) {
      setTokenBalance(
        +currencyFormatter(resposne.data?.balance || 0, fromToken.decimals),
      );
    }
  };
  useEffect(() => {
    getBalance();
  }, []);
  const [form] = Form.useForm();
  const cycleKey = Form.useWatch(DCA_FORM_FIELD.cycle, form) || 'daily';
  const amount =
    +Form.useWatch(DCA_FORM_FIELD.amount, form) ||
    DCA_FORM_DEFAULT_VALUES.amount;
  const period =
    +Form.useWatch(DCA_FORM_FIELD.period, form) ||
    DCA_FORM_DEFAULT_VALUES.period;
  const isInsufficientFund = tokenBalance < amount;
  const btn = isInsufficientFund ? 'INSUFFICIENT FUNDS' : 'MODIFY';

  return (
    <Modal
      centered
      width={850}
      visible
      closeIcon={<span className="text-white">&#x2715;</span>}
      footer={null}
      onCancel={() => setPositionInfo(undefined)}
    >
      <div className="w-full h-full px-6 py-10 m-auto rounded-lg bg-gray850">
        <Form
          id="modifyPosition"
          onFinish={(formValue) => {
            const inputtedAmount =
              formValue[DCA_FORM_FIELD.amount] ||
              DCA_FORM_DEFAULT_VALUES.amount;
            const params = [
              positionInfo.positionId,
              parseUnitsInWei(inputtedAmount, fromToken.decimals),
              formValue[DCA_FORM_FIELD.period],
              '0x',
              true,
              nativeCurrencyAddresses.includes(fromToken.contract),
            ];
            modifyPosition(params);
          }}
          form={form}
          initialValues={{
            [DCA_FORM_FIELD.period]: DCA_FORM_DEFAULT_VALUES.period,
          }}
        >
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="mt-5 md:col-span-1 md:mt-8">
              <TokenInfo fromToken={fromToken} toToken={toToken} />
              <InvestmentAmount
                form={form}
                currentFromToken={positionInfo.fromToken}
                tokenBalance={tokenBalance}
              />
              <InvestmentPeriod cycleKey={cycleKey} form={form} />
            </div>
            <Summary
              positionInfo={positionInfo}
              btn={btn}
              isDisabled={isInsufficientFund}
              period={period}
              amount={amount}
            />
          </div>
        </Form>
      </div>
    </Modal>
  );
}
export default ModifyPosition;
