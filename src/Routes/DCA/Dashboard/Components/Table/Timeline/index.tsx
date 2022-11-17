import { Modal, Tabs } from 'antd';
import React from 'react';
import { TIMELINE_TABS } from '../../../../../../Logic/DCA/Dashboard/Constants';
import { TimelineType } from '../../../../../../Logic/DCA/Dashboard/Types';
import Order from './Order';
import Positions from './Positions';

function Timeline({
  timelineData,
  setTimelineData,
}: {
  timelineData: TimelineType;
  setTimelineData: Function;
}) {
  return (
    <Modal
      centered
      width={700}
      visible
      closeIcon={<span className="text-white">&#x2715;</span>}
      footer={null}
      onCancel={() => {
        setTimelineData(undefined);
      }}
    >
      <div className="m-auto p-6 rounded-lg bg-gray850">
        <Tabs defaultActiveKey={TIMELINE_TABS.order}>
          <Tabs.TabPane tab={TIMELINE_TABS.trades} key={TIMELINE_TABS.trades}>
            <Order timelineData={timelineData} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={TIMELINE_TABS.positions}
            key={TIMELINE_TABS.positions}
          >
            <Positions timelineData={timelineData} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}
export default React.memo(Timeline);
