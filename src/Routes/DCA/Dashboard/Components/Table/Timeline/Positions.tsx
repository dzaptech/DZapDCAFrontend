import { List } from 'antd';
import moment from 'moment';
import React from 'react';
import { PositionActions } from '../../../../../../Logic/DCA/Dashboard/Constants/enums';
import {
  PositionHistoryType,
  TimelineType,
} from '../../../../../../Logic/DCA/Dashboard/Types';
import { parsePositionModifiedDesc } from '../../../../../../Logic/DCA/Dashboard/Utils';

function Positions({ timelineData }: { timelineData: TimelineType }) {
  const {
    history,
    tokenInfo: { fromToken },
  } = timelineData;
  return (
    <List
      itemLayout="horizontal"
      dataSource={history.filter(
        (item: PositionHistoryType) => item.action !== PositionActions.swapped,
      )}
      renderItem={(item: PositionHistoryType) => {
        let description = 'Position creation executed!';
        if (
          item.action === PositionActions.modifyDuration ||
          item.action === PositionActions.modifyRate ||
          item.action === PositionActions.modifyRateDuration
        ) {
          description = parsePositionModifiedDesc(item, fromToken);
        } else if (item.action === PositionActions.terminated) {
          description = 'Position termination executed!';
        }
        return (
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
                  {description}
                </p>
              }
            />
          </List.Item>
        );
      }}
    />
  );
}
export default React.memo(Positions);
