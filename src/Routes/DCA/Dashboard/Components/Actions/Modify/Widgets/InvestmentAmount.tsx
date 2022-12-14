import { Form, Input, Radio } from 'antd';
import wallet from '../../../../../../../Assets/Icons/wallet.svg';
import Button from '../../../../../../../Components/Button/Button';
import { setFormValues } from '../../../../../../../Logic/DCA/Create/Utils/FormUtils';
import { DCA_FORM_FIELD } from '../../../../../../../Logic/DCA/Dashboard/Constants';
import { TokenTypes } from '../../../../../../../Types';
import {
  getAlternateTokenIcon,
  truncateDecimals,
} from '../../../../../../../Utils/GeneralUtils';

function InvestmentAmount({
  currentFromToken,
  form,
  tokenBalance,
}: {
  currentFromToken: TokenTypes;
  form: any;
  tokenBalance: number;
}) {
  return (
    <div>
      <p className="mb-1 font-semibold text-sm text-white mullish">
        Total Investment Amount
      </p>
      <Form.Item name="isInc" id="isInc" className="-mb-0">
        <Radio.Group buttonStyle="solid" defaultValue>
          <Radio.Button className="btn-radio" value>
            Increment
          </Radio.Button>
          <Radio.Button className="btn-radio" value={false}>
            Decrement
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        className="mt-2"
        name={DCA_FORM_FIELD.amount}
        id={DCA_FORM_FIELD.amount}
      >
        <Input
          placeholder="Enter amount"
          type="number"
          prefix={
            <img
              className="rounded-full h-6 w-6 mr-2"
              src={currentFromToken.logo}
              alt={getAlternateTokenIcon()}
            />
          }
          defaultValue="0"
          suffix={
            <Button
              onClick={() => setFormValues(form, 'amount', tokenBalance)}
              className="wallet-balance px-4 flex"
            >
              <img
                className="rounded-full h-4 w-4 mr-1"
                src={wallet}
                alt={getAlternateTokenIcon()}
              />
              {truncateDecimals(tokenBalance)} {currentFromToken.symbol}
            </Button>
          }
          className="w-full create-position-input px-3"
        />
      </Form.Item>
    </div>
  );
}
export default InvestmentAmount;
