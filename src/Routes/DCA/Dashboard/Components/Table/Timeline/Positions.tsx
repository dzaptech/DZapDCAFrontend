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
import { parsePositionModifiedDesc } from '../../../../../../Logic/DCA/Dashboard/Utils';
import { getHashExplorerLink } from '../../../../../../Utils/ChainUtils';

function Positions({ timelineData }: { timelineData: TimelineType }) {
  const {
    history,
    tokenInfo: { fromToken },
  } = timelineData;
  const { chainId } = useContext(AuthContext);
  return (
    <List
      itemLayout="horizontal"
      dataSource={history.filter(
        (item: PositionHistoryType) => item.action !== PositionActions.swapped,
      )}
      renderItem={(item: PositionHistoryType) => {
        let description = 'Position created.';
        if (
          item.action === PositionActions.modifyDuration ||
          item.action === PositionActions.modifyRate ||
          item.action === PositionActions.modifyRateDuration
        ) {
          description = parsePositionModifiedDesc(item, fromToken);
        } else if (item.action === PositionActions.terminated) {
          description = 'Position terminated.';
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
        );
      }}
    />
  );
}
export default React.memo(Positions);
