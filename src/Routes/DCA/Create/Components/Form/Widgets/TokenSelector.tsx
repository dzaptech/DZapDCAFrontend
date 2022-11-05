import { Form, Select } from 'antd';
import downArrow from '../../../../../../Assets/Icons/dropdown-arrow.svg';
import swap from '../../../../../../Assets/Icons/swap.svg';
import Button from '../../../../../../Components/Button/Button';
import { TokenTypes } from '../../../../../../Types';
import { getAlternateTokenIcon } from '../../../../../../Utils/GeneralUtils';

const { Option } = Select;

function TokenSelector({
  fromTokens,
  toTokens,
  swapToken,
}: {
  fromTokens: TokenTypes[];
  toTokens: TokenTypes[];
  swapToken: Function;
}) {
  const alternateIcon = getAlternateTokenIcon();
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-12">
      <div className="sm:col-span-5">
        <p className="mb-1 font-semibold text-sm text-white mullish">Sell</p>
        <Form.Item name="fromToken" id="fromTokens">
          <Select
            placeholder="Select token"
            className="w-full create-position-select-box"
            showSearch
            suffixIcon={
              <img className="-rotate-180 right-0" src={downArrow} alt="" />
            }
          >
            {fromTokens.map((item: TokenTypes) => (
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
        <Button onClick={() => swapToken()}>
          <img src={swap} alt="" className="mx-4 h-8 w-8" />
        </Button>
      </div>
      <div className="sm:col-span-5">
        <p className="mb-1 font-semibold text-sm text-white mullish">Receive</p>
        <Form.Item name="toToken" id="toTokens">
          <Select
            placeholder="Select token"
            showSearch
            className="w-full create-position-select-box"
            suffixIcon={
              <img className="-rotate-180 right-0" src={downArrow} alt="" />
            }
          >
            {toTokens.map((item: TokenTypes) => (
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
