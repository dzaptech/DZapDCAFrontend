import { Form, Input } from 'antd';
import wallet from '../../../../../../Assets/Icons/wallet.svg';
import Button from '../../../../../../Components/Button/Button';
import { SAMPLE_TOKEN } from '../../../../../../Constants';
import { getAlternateTokenIcon } from '../../../../../../Utils/GeneralUtils';

function InvestmentAmount() {
  const token = SAMPLE_TOKEN;
  return (
    <div>
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
        <p className="mb-1 font-semibold text-sm text-white mullish">
          Investment amount
        </p>
        <Input
          placeholder="0"
          type="number"
          prefix={
            <img
              className="rounded-full h-6 w-6 mr-2"
              src={token.logo}
              alt={getAlternateTokenIcon()}
            />
          }
          suffix={
            <Button className="wallet-balance px-4 flex">
              <img
                className="rounded-full h-4 w-4 mr-1"
                src={wallet}
                alt={getAlternateTokenIcon()}
              />
              3.77 MATIC
            </Button>
          }
          className="w-full create-position-input px-3"
        />
      </Form.Item>
    </div>
  );
}
export default InvestmentAmount;
