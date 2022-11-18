import { Form, Input, Radio } from 'antd';
import { INVESTMENT_PERIOD } from '../../../../../../../Logic/DCA/Create/Constants';
import { setFormValues } from '../../../../../../../Logic/DCA/Create/Utils/FormUtils';
import { DCA_FORM_FIELD } from '../../../../../../../Logic/DCA/Dashboard/Constants';

function InvestmentPeriod({ form }: { form: any }) {
  const period = Form.useWatch(DCA_FORM_FIELD.period, form);

  return (
    <div>
      <p className="mb-1 mt-8 font-semibold text-sm text-white mullish">
        How many times
      </p>
      <div className="flex">
        <Form.Item name={DCA_FORM_FIELD.period} id={DCA_FORM_FIELD.period}>
          <Input
            placeholder="Enter period"
            type="number"
            className="w-full input-investment px-3"
          />
        </Form.Item>
        <Radio.Group className="ml-2" value={+period} buttonStyle="solid">
          {INVESTMENT_PERIOD.map((item) => (
            <Radio.Button
              onClick={() =>
                setFormValues(form, DCA_FORM_FIELD.period, item.value)
              }
              className="btn-radio"
              value={item.value}
            >
              {item.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
}
export default InvestmentPeriod;
