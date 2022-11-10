import { Form } from 'antd';
import {
  DCA_FORM_DEFAULT_VALUES,
  DCA_FORM_FIELD,
} from '../../../../../Logic/DCA/Create/Constants';
import { DCATrxState } from '../../../../../Logic/DCA/Create/Constants/enums';
import initDCAForm from '../../../../../Logic/DCA/Create/Hooks/initDCAForm';
import useCreateDCA from '../../../../../Logic/DCA/Create/Hooks/useCreateDCA';
import DCATrxStateModal from '../Trx/DCATrxStateModal';
import InvestmentAmount from './Widgets/InvestmentAmount';
import InvestmentPeriod from './Widgets/InvestmentPeriod';
import Summary from './Widgets/Summary';
import TokenSelector from './Widgets/TokenSelector';

function CreatePositionForm() {
  const {
    fromTokens,
    toTokens,
    form,
    defaultSelect,
    currentFromToken,
    currentToToken,
    swapToken,
    cycleKey,
    onChangeFromToken,
    hasAllowance,
    trxState,
  } = initDCAForm();

  const { onSubmit } = useCreateDCA();
  return (
    <Form
      id="createPosition"
      form={form}
      onFinish={onSubmit}
      initialValues={{
        [DCA_FORM_FIELD.fromToken]: JSON.stringify(defaultSelect.from),
        [DCA_FORM_FIELD.toToken]: JSON.stringify(defaultSelect.to),
        [DCA_FORM_FIELD.period]: DCA_FORM_DEFAULT_VALUES.period,
        cycle: DCA_FORM_DEFAULT_VALUES.cycle,
      }}
    >
      {trxState !== DCATrxState.unset && <DCATrxStateModal />}
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="mt-5 md:col-span-1 md:mt-8">
          <TokenSelector
            swapToken={swapToken}
            fromTokens={fromTokens}
            toTokens={toTokens}
            fromTokenContract={currentFromToken?.contract}
            toTokenContract={currentToToken?.contract}
            onChangeFromToken={onChangeFromToken}
          />
          <InvestmentAmount form={form} currentFromToken={currentFromToken} />
          <InvestmentPeriod cycleKey={cycleKey} form={form} />
        </div>
        <Summary
          currentFromToken={currentFromToken}
          form={form}
          cycleKey={cycleKey}
          hasAllowance={hasAllowance}
        />
      </div>
    </Form>
  );
}
export default CreatePositionForm;
