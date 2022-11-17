import { Form, Input, Radio } from 'antd';
import {
  DCA_FORM_FIELD,
  INVESTMENT_CYCLE,
  INVESTMENT_PERIOD,
} from '../../../../../../Logic/DCA/Create/Constants';
import { setFormValues } from '../../../../../../Logic/DCA/Create/Utils/FormUtils';

function InvestmentPeriod({ form, cycleKey }: { form: any; cycleKey: string }) {
  const period = Form.useWatch(DCA_FORM_FIELD.period, form);
  const cycle = INVESTMENT_CYCLE[cycleKey].value;

  return (
    <div>
      <p className="font-semibold text-sm text-white mullish">How often?</p>
      <Form.Item name={DCA_FORM_FIELD.cycle} id={DCA_FORM_FIELD.cycle}>
        <Radio.Group buttonStyle="solid">
          {Object.keys(INVESTMENT_CYCLE).map((key: string) => (
            <Radio.Button className="btn-radio" value={key}>
              {INVESTMENT_CYCLE[key].label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <p className="mb-1 mt-8 font-semibold text-sm text-white mullish">
        Investment Period
      </p>
      <div className="flex">
        <Form.Item name={DCA_FORM_FIELD.period} id={DCA_FORM_FIELD.period}>
          <Input
            placeholder="Enter period"
            type="number"
            className="w-full input-investment px-3"
          />
        </Form.Item>
        <Radio.Group
          className="ml-2"
          value={+period || cycle}
          buttonStyle="solid"
        >
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
