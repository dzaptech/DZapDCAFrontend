import { Form } from 'antd';
import { DCA_FORM_FIELD } from '../../../../../Logic/DCA/Create/Constants';
import initDCAForm from '../../../../../Logic/DCA/Create/Hooks/initDCAForm';
import InvestmentAmount from './Widgets/InvestmentAmount';
import InvestmentPeriod from './Widgets/InvestmentPeriod';
import Summary from './Widgets/Summary';
import TokenSelector from './Widgets/TokenSelector';

function CreatePositionForm() {
  const {
    fromTokens,
    toTokens,
    defaultSelect,
    form,
    currentFromToken,
    isApproved,
    swapToken,
  } = initDCAForm();

  return (
    <div className="md:grid md:grid-cols-2 md:gap-6">
      <div className="mt-5 md:col-span-1 md:mt-8">
        <Form
          form={form}
          initialValues={{
            [DCA_FORM_FIELD.fromToken]: defaultSelect.from
              ? JSON.stringify(defaultSelect.from)
              : null,
            [DCA_FORM_FIELD.toToken]: defaultSelect.to
              ? JSON.stringify(defaultSelect.to)
              : null,
            [DCA_FORM_FIELD.period]: '30',
          }}
        >
          <TokenSelector
            swapToken={swapToken}
            fromTokens={fromTokens}
            toTokens={toTokens}
          />
          <InvestmentAmount form={form} currentFromToken={currentFromToken} />
          <InvestmentPeriod form={form} />
        </Form>
      </div>
      <Summary
        isApproved={isApproved}
        currentFromToken={currentFromToken}
        form={form}
      />
    </div>
  );
}
export default CreatePositionForm;
