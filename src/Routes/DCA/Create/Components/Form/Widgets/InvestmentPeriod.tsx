import { Form, Input, Radio } from 'antd';
import { setFormValues } from '../../../../../../Logic/DCA/Create/Utils/FormUtils';

function InvestmentPeriod({ form }: { form: any }) {
  const period = Form.useWatch('period', form);
  const cycle = [
    {
      value: '1',
      label: 'Daily',
    },
    {
      value: '7',
      label: 'Weekly',
    },
    {
      value: '30',
      label: 'Monthly',
    },
  ];
  const customPeriod = [
    {
      value: '5',
      label: '5',
    },
    {
      value: '15',
      label: '15',
    },
    {
      value: '30',
      label: '30',
    },
  ];
  return (
    <div>
      <p className="font-semibold text-sm text-white mullish">How often?</p>
      <Form.Item name="cycle" id="cycle">
        <Radio.Group defaultValue="1" buttonStyle="solid">
          {cycle.map((item) => (
            <Radio.Button className="btn-radio" value={item.value}>
              {item.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <p className="mb-1 mt-8 font-semibold text-sm text-white mullish">
        Investment Period
      </p>
      <div className="flex">
        <Form.Item
          name="period"
          id="period"
          //   rules={[
          //     {
          //       required: true,
          //       message: '!',
          //     },
          //   ]}
        >
          <Input
            placeholder="Custom"
            type="number"
            className="w-full input-investment px-3"
          />
        </Form.Item>
        <Radio.Group className="ml-2" value={period} buttonStyle="solid">
          {customPeriod.map((item) => (
            <Radio.Button
              onClick={() => setFormValues(form, 'period', item.value)}
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
