import { Form, Input, Radio } from 'antd';

function InvestmentPeriod() {
  const period = [
    {
      value: 'daily',
      label: 'Daily',
    },
    {
      value: 'weekly',
      label: 'Weekly',
    },
    {
      value: 'monthly',
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
      <Radio.Group defaultValue="daily" buttonStyle="solid">
        {period.map((item) => (
          <Radio.Button className="btn-radio" value={item.value}>
            {item.label}
          </Radio.Button>
        ))}
      </Radio.Group>
      <p className="mb-1 mt-8 font-semibold text-sm text-white mullish">
        Investment Period
      </p>
      <div className="flex">
        <Form.Item
          name="gatherCurrency"
          id="gatherCurrency"
          rules={[
            {
              required: true,
              message: 'Please select gather currency!',
            },
          ]}
        >
          <Input
            placeholder="Custom"
            type="number"
            className="w-full input-investment px-3"
          />
        </Form.Item>
        <Radio.Group className="ml-2" defaultValue="daily" buttonStyle="solid">
          {customPeriod.map((item) => (
            <Radio.Button className="btn-radio" value={item.value}>
              {item.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
}
export default InvestmentPeriod;
