import { Form } from 'antd';
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
  } = initDCAForm();

  return (
    <div className="md:grid md:grid-cols-2 md:gap-6">
      <div className="mt-5 md:col-span-1 md:mt-8">
        <Form
          form={form}
          initialValues={{
            fromToken: defaultSelect.from
              ? JSON.stringify(defaultSelect.from)
              : null,
            toToken: defaultSelect.to ? JSON.stringify(defaultSelect.to) : null,
            period: '30',
          }}
        >
          <TokenSelector fromTokens={fromTokens} toTokens={toTokens} />
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
