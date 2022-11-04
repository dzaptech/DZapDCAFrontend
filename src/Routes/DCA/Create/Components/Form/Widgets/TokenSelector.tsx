import { Form, Select } from 'antd';
import downArrow from '../../../../../../Assets/Icons/dropdown-arrow.svg';
import swap from '../../../../../../Assets/Icons/swap.svg';
import { APP } from '../../../../../../Constants/AppConstants';
import { TokenTypes } from '../../../../../../Types';
import { getDefaultToken } from '../../../../../../Utils/AppUtils';
import { getAlternateTokenIcon } from '../../../../../../Utils/GeneralUtils';

const { Option } = Select;

function TokenSelector() {
  const defualtToken = getDefaultToken(APP.dca, 56);
  const alternateIcon = getAlternateTokenIcon();
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-12">
      <div className="sm:col-span-5">
        <Form.Item name="sellToken" id="sellToken">
          <p className="mb-1 font-semibold text-sm text-white mullish">Sell</p>
          <Select
            placeholder="Select token"
            defaultValue={JSON.stringify(defualtToken)}
            className="w-full create-position-select-box"
            suffixIcon={
              <img className="-rotate-180 right-0" src={downArrow} alt="" />
            }
          >
            {[defualtToken].map((item: TokenTypes) => (
              <Option value={JSON.stringify(item)} key={item.contract}>
                <div className="flex items-center">
                  <img
                    className="rounded-full h-6 w-6 mr-2"
                    src={item.logo}
                    alt={alternateIcon}
                  />
                  <p className="font-medium text-sm text-white mullish">
                    {item.symbol}
                  </p>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="sm:col-span-2">
        <img src={swap} alt="" className="mx-4 h-8 w-8" />
      </div>
      <div className="sm:col-span-5">
        <Form.Item name="buyToken" id="buyToken">
          <p className="mb-1 font-semibold text-sm text-white mullish">
            Receive
          </p>
          <Select
            placeholder="Select token"
            defaultValue={JSON.stringify(defualtToken)}
            className="w-full create-position-select-box"
            suffixIcon={
              <img className="-rotate-180 right-0" src={downArrow} alt="" />
            }
          >
            {[defualtToken].map((item: TokenTypes) => (
              <Option
                value={JSON.stringify(item)}
                //   disabled={batchSellSelectedTokens[item.contract]}
                key={item.contract}
              >
                <div className="flex items-center">
                  <img
                    className="rounded-full h-6 w-6 mr-2"
                    src={item.logo}
                    alt={alternateIcon}
                  />
                  <p className="font-medium text-sm text-white mullish">
                    {item.symbol}
                  </p>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </dl>
  );
}
export default TokenSelector;
