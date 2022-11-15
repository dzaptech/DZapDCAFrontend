import { List, Modal, Tabs } from 'antd';
import moment from 'moment';
import React from 'react';
import { TIMELINE_TABS } from '../../../../../../Logic/DCA/Dashboard/Constants';
import { PositionActions } from '../../../../../../Logic/DCA/Dashboard/Constants/enums';
import { PositionHistoryType } from '../../../../../../Logic/DCA/Dashboard/Types';

function Timeline({
  history,
  setHistory,
}: {
  history: PositionHistoryType[];
  setHistory: Function;
}) {
  return (
    <Modal
      centered
      width={700}
      visible
      closeIcon={<span className="text-white">&#x2715;</span>}
      footer={null}
      onCancel={() => {
        setHistory(undefined);
      }}
    >
      <div className="m-auto p-6 rounded-lg bg-gray850">
        <Tabs defaultActiveKey={TIMELINE_TABS.positions}>
          <Tabs.TabPane
            tab={TIMELINE_TABS.positions}
            key={TIMELINE_TABS.positions}
          >
            <List
              itemLayout="horizontal"
              dataSource={history.filter(
                (item: PositionHistoryType) =>
                  item.action !== PositionActions.swapped,
              )}
              renderItem={(item: PositionHistoryType) => {
                let action = 'Created';
                if (item.action === PositionActions.modified) {
                  action = 'Modified';
                } else if (item.action === PositionActions.terminated) {
                  action = 'Terminated';
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
                          Position {action} : add description
                        </p>
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={TIMELINE_TABS.trades} key={TIMELINE_TABS.trades}>
            <List
              itemLayout="horizontal"
              dataSource={history.filter(
                (item: PositionHistoryType) =>
                  item.action === PositionActions.swapped,
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
                        Swapped : add description
                      </p>
                    }
                  />
                </List.Item>
              )}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}
export default React.memo(Timeline);
