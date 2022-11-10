import { Table } from 'antd';
import { DCATrxState } from '../../../../../Logic/DCA/Create/Constants/enums';
import useDCATable from '../../../../../Logic/DCA/Dashboard/Hooks/useDCATable';
import ModifyPosition from '../Actions/Modify/ModifyPosition';
import DashboardTrxStateModal from '../Trx/DashboardTrxStateModal';

function DCATable() {
  const { columns, positions, isLoading, trxState, retry, positionInfo, modifyPosition, setPositionInfo } =
    useDCATable();
  return (
    <div>
      {trxState !== DCATrxState.unset && (
        <DashboardTrxStateModal retry={retry} />
      )}
      {!!positionInfo && <ModifyPosition setPositionInfo={setPositionInfo} positionInfo={positionInfo} modifyPosition={modifyPosition} />}
      <Table
        className="trx-table"
        columns={columns}
        loading={isLoading}
        dataSource={positions || []}
        pagination={{
          position: ['bottomCenter'],
          hideOnSinglePage: false,
          prevIcon: (
            <button
              type="button"
              className="trx_pagination_btn h-9 text-center capitalize flex justify-center items-center gap-x-2 font-bold text-sm rounded-sm"
            >
              <p>&larr;</p>
              <p>Previous</p>
            </button>
          ),
          nextIcon: (
            <button
              type="button"
              className="trx_pagination_btn h-9 text-center capitalize flex justify-center items-center gap-x-2 font-bold text-sm rounded-sm"
            >
              <p>Next</p>
              <p>&rarr;</p>
            </button>
          ),
        }}
      />
    </div>
  );
}
export default DCATable;
