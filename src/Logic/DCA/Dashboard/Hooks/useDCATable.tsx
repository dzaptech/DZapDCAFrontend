import { ColumnsType } from 'antd/lib/table';
import { useSelector } from 'react-redux';
import graph from '../../../../Assets/Icons/graph.svg';
import timeline from '../../../../Assets/Icons/timeline.svg';
import Button from '../../../../Components/Button/Button';
import { APP } from '../../../../Constants/AppConstants';
import { RootState } from '../../../../Store';
import { getDefaultToken } from '../../../../Utils/AppUtils';
import { getChainInfoValue } from '../../../../Utils/ChainUtils';
import { getAlternateTokenIcon } from '../../../../Utils/GeneralUtils';

function useDCATable() {
  const { positions, isLoading } = useSelector(
    (state: RootState) => state.dcaDashboard,
  );
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
      key: 'chainId',
      dataIndex: 'chainId',
      render: (value) => (
        <img
          className="h-6 w-6"
          src={getChainInfoValue(value, 'icon')?.toString() || ''}
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
  return {
    columns,
    positions,
    isLoading,
  };
}

export default useDCATable;
