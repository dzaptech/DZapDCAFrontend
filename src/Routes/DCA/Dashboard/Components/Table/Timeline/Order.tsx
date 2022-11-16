import { List } from 'antd';
import moment from 'moment';
import React from 'react';
import { PositionActions } from '../../../../../../Logic/DCA/Dashboard/Constants/enums';
import {
  PositionHistoryType,
  TimelineType,
} from '../../../../../../Logic/DCA/Dashboard/Types';
import { abbreviateCurrency } from '../../../../../../Utils/GeneralUtils';

function Order({ timelineData }: { timelineData: TimelineType }) {
  const {
    history,
    tokenInfo: { fromToken, toToken },
  } = timelineData;
  return (
    <List
      itemLayout="horizontal"
      dataSource={history.filter(
        (item: PositionHistoryType) =>
          item.action === PositionActions.swapped ||
          item.action === PositionActions.withdraw,
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
                Execute Order :{' '}
                {item.action === PositionActions.withdraw ? (
                  <>
                    {abbreviateCurrency(item.withdrawn, toToken.decimals)}{' '}
                    {toToken.symbol} withdrawn
                  </>
                ) : (
                  <>
                    Swap{' '}
                    {abbreviateCurrency(item.fromAmount, fromToken.decimals)}{' '}
                    {fromToken.symbol} for{' '}
                    {abbreviateCurrency(item.toAmount, toToken.decimals)}{' '}
                    {toToken.symbol}
                  </>
                )}
              </p>
            }
          />
        </List.Item>
      )}
    />
  );
}
export default React.memo(Order);
