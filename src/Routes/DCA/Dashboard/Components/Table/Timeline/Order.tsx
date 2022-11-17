import { List } from 'antd';
import moment from 'moment';
import React, { useContext } from 'react';
import explorer from '../../../../../../Assets/Icons/explorer-green.svg';
import AuthContext from '../../../../../../Context/AuthContext';
import { PositionActions } from '../../../../../../Logic/DCA/Dashboard/Constants/enums';
import {
  PositionHistoryType,
  TimelineType,
} from '../../../../../../Logic/DCA/Dashboard/Types';
import { getHashExplorerLink } from '../../../../../../Utils/ChainUtils';
import {
  abbreviateCurrency,
  abbreviateNumber,
} from '../../../../../../Utils/GeneralUtils';

function Order({ timelineData }: { timelineData: TimelineType }) {
  const {
    history,
    tokenInfo: { fromToken, toToken },
  } = timelineData;
  const { chainId } = useContext(AuthContext);

  return (
    <List
      itemLayout="horizontal"
      dataSource={history.filter(
        (item: PositionHistoryType) => item.action === PositionActions.swapped,
      )}
      renderItem={(item: PositionHistoryType) => (
        <List.Item>
          <List.Item.Meta
            title={
              <span className="text-sm text-gray-400">
                {moment(+item.createdAtTimestamp * 1000).format(
                  'DD MMM YYYY, h:mm A',
                )}
              </span>
            }
            description={
              <p className="font-medium text-sm text-white mullish">
                Execute Order : Swap{' '}
                {abbreviateCurrency(item.fromAmount, fromToken.decimals)}{' '}
                {fromToken.symbol} for{' '}
                {abbreviateCurrency(item.toAmount, toToken.decimals)}{' '}
                {toToken.symbol} at{' '}
                {abbreviateNumber(+item.toAmount / +item.fromAmount)}{' '}
                {toToken.symbol}
                <button
                  type="button"
                  onClick={() => {
                    window.open(
                      getHashExplorerLink(item.transactionHash, chainId),
                    );
                  }}
                  className="mt-1 flex justify-start items-center gap-x-2"
                >
                  <p className="text-green300">View Transaction</p>
                  <img
                    src={explorer}
                    className="w-5 h-5 object-contain"
                    alt="explorer"
                  />
                </button>
              </p>
            }
          />
        </List.Item>
      )}
    />
  );
}
export default React.memo(Order);
