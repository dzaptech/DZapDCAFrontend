import { Form } from 'antd';
import InvestmentAmount from './Widgets/InvestmentAmount';
import InvestmentPeriod from './Widgets/InvestmentPeriod';
import TokenSelector from './Widgets/TokenSelector';

function CreatePositionForm() {
  return (
    <div className="mt-5 md:col-span-1 md:mt-8">
      <Form>
        <TokenSelector />
        <InvestmentAmount />
        <InvestmentPeriod />
      </Form>
    </div>
  );
}
export default CreatePositionForm;
