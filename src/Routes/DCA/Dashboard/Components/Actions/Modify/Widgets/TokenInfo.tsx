import { TokenTypes } from '../../../../../../../Types';

function TokenInfo({
  fromToken,
  toToken,
}: {
  fromToken: TokenTypes;
  toToken: TokenTypes;
}) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-12 mb-4">
      <div className="sm:col-span-6 pr-1">
        <p className="mb-1 font-semibold text-sm text-white mullish">Sell</p>
        <div className="token-info-box-layout p-1.5">
          <div className="flex items-center">
            <img
              className="rounded-full h-6 w-6 mr-2"
              src={fromToken.logo}
              alt=""
            />
            <p className="font-medium text-sm text-white mullish">
              {fromToken.symbol}
            </p>
          </div>
        </div>
      </div>
      <div className="sm:col-span-6 pl-1">
        <p className="mb-1 font-semibold text-sm text-white mullish">Receive</p>
        <div className="token-info-box-layout p-1.5">
          <div className="flex items-center">
            <img
              className="rounded-full h-6 w-6 mr-2"
              src={toToken.logo}
              alt=""
            />
            <p className="font-medium text-sm text-white mullish">
              {toToken.symbol}
            </p>
          </div>
        </div>
      </div>
    </dl>
  );
}
export default TokenInfo;
