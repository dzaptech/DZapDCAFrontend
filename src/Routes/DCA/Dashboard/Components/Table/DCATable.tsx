import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Button from '../../../../../Components/Button/Button';
import { APP } from '../../../../../Constants/AppConstants';
import { getDefaultToken } from '../../../../../Utils/AppUtils';
import { getChainInfoValue } from '../../../../../Utils/ChainUtils';
import { getAlternateTokenIcon } from '../../../../../Utils/GeneralUtils';
import graph from '../../../../../Assets/Icons/graph.svg';
import timeline from '../../../../../Assets/Icons/timeline.svg';

function DCATable() {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const defualtToken = getDefaultToken(APP.dca, 56);
  const alternateIcon = getAlternateTokenIcon();

  const columns: ColumnsType<DataType> = [
    {
      title: 'I/P',
      dataIndex: 'input',
      key: 'input',
      render: () => (
        <div className="flex items-center">
          <img
            className="rounded-full h-6 w-6 mr-2"
            src={defualtToken.logo}
            alt={alternateIcon}
          />
          <p className="font-medium text-sm text-white mullish">
            {defualtToken.symbol}
          </p>
        </div>
      ),
    },
    {
      title: 'O/P',
      dataIndex: 'ouput',
      key: 'ouput',
      render: () => (
        <div className="flex items-center">
          <img
            className="rounded-full h-6 w-6 mr-2"
            src={defualtToken.logo}
            alt={alternateIcon}
          />
          <p className="font-medium text-sm text-white mullish">
            {defualtToken.symbol}
          </p>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () => (
        <span className="inline-flex rounded-full bg-green-300 px-2 text-xs font-semibold leading-5 text-green-800">
          Finished
        </span>
      ),
    },
    {
      title: 'Chain',
      key: 'chain',
      dataIndex: 'chain',
      render: () => (
        <img
          className="h-6 w-6"
          src={getChainInfoValue(56, 'icon')?.toString() || ''}
          alt=""
        />
      ),
    },
    {
      title: 'Swapped',
      key: 'swapped',
      dataIndex: 'swapped',
      render: () => <>0.0000975338 LINK</>,
    },
    {
      title: 'Remaining',
      key: 'remaining',
      dataIndex: 'remaining',
      render: () => (
        <>
          <span className="text-sm text-gray-400">0&nbsp;</span>
          USDT
        </>
      ),
    },
    {
      title: 'To withdraw',
      key: 'toWithdraw',
      dataIndex: 'toWithdraw',
      render: () => <>0.0000975338 LINK</>,
    },
    {
      title: 'Buy Price',
      key: 'buyPrice',
      dataIndex: 'buyPrice',
      render: () => <img src={graph} alt="" />,
    },

    {
      title: 'Timeline',
      key: 'timeline',
      dataIndex: 'timeline',
      render: () => <img src={timeline} alt="" />,
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Button className="btn-table-action w-full mt-2">REUSE</Button>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <Table
      className="trx-table"
      columns={columns}
      dataSource={data}
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
