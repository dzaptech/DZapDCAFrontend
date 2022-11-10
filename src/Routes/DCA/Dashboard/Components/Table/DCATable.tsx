import { Table } from 'antd';
import useDCATable from '../../../../../Logic/DCA/Dashboard/Hooks/useDCATable';

function DCATable() {
  const { columns, positions, isLoading } = useDCATable();
  return (
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
  );
}
export default DCATable;
