import { Form, Input } from 'antd';
import wallet from '../../../../../../Assets/Icons/wallet.svg';
import Button from '../../../../../../Components/Button/Button';
import { setFormValues } from '../../../../../../Logic/DCA/Create/Utils/FormUtils';
import { TokenTypes } from '../../../../../../Types';
import {
  currencyFormatter,
  getAlternateTokenIcon,
  truncateDecimals,
} from '../../../../../../Utils/GeneralUtils';

function InvestmentAmount({
  currentFromToken,
  form,
}: {
  currentFromToken: TokenTypes;
  form: any;
}) {
  const balance = +currencyFormatter(
    currentFromToken.balance,
    currentFromToken.decimals,
  );
  return (
    <div>
      <p className="mb-1 font-semibold text-sm text-white mullish">
        Investment amount
      </p>
      <Form.Item
        name="amount"
        id="amount"
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please select gather currency!',
        //   },
        // ]}
      >
        <Input
          placeholder="0"
          type="number"
          prefix={
            <img
              className="rounded-full h-6 w-6 mr-2"
              src={currentFromToken.logo}
              alt={getAlternateTokenIcon()}
            />
          }
          suffix={
            <Button
              onClick={() => setFormValues(form, 'amount', balance)}
              className="wallet-balance px-4 flex"
            >
              <img
                className="rounded-full h-4 w-4 mr-1"
                src={wallet}
                alt={getAlternateTokenIcon()}
              />
              {truncateDecimals(balance)} {currentFromToken.symbol}
            </Button>
          }
          className="w-full create-position-input px-3"
        />
      </Form.Item>
    </div>
  );
}
export default InvestmentAmount;
