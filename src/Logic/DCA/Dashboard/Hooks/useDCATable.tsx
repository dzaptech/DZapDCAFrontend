import { ColumnsType } from 'antd/lib/table';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import graph from '../../../../Assets/Icons/graph.svg';
import timeline from '../../../../Assets/Icons/timeline.svg';
import Button from '../../../../Components/Button/Button';
import { nativeCurrencyAddresses } from '../../../../Config/ChainConfig';
import AuthContext from '../../../../Context/AuthContext';
import { RootState } from '../../../../Store';
import { TokenTypes } from '../../../../Types';
import { getChainInfoValue } from '../../../../Utils/ChainUtils';
import { getAlternateTokenIcon } from '../../../../Utils/GeneralUtils';
import { formatSwapInterval } from '../Utils';
import useActions from './useActions';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

function useDCATable() {
  const { positions, isLoading } = useSelector(
    (state: RootState) => state.dcaDashboard,
  );
  const [positionInfo, setPositionInfo] = useState(false);
  const { account } = useContext(AuthContext);
  const { trxState } = useSelector((state: RootState) => state.dca);
  const { terminate, modifyPosition, retry } = useActions();
  const alternateIcon = getAlternateTokenIcon();

  const columns: ColumnsType<DataType> = [
    {
      title: 'I/P',
      dataIndex: 'fromToken',
      key: 'fromToken',
      render: (fromToken: TokenTypes) => (
        <div className="flex items-center">
          <img
            className="rounded-full h-6 w-6 mr-2"
            src={fromToken.logo}
            alt={alternateIcon}
          />
          <p className="font-medium text-sm text-white mullish">
            {fromToken.symbol}
          </p>
        </div>
      ),
    },
    {
      title: 'O/P',
      dataIndex: 'toToken',
      key: 'toToken',
      render: (toToken: TokenTypes) => (
        <div className="flex items-center">
          <img
            className="rounded-full h-6 w-6 mr-2"
            src={toToken.logo}
            alt={alternateIcon}
          />
          <p className="font-medium text-sm text-white mullish">
            {toToken.symbol}
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
          Running
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
      title: 'Interval',
      key: 'swapInterval',
      dataIndex: 'swapInterval',
      render: (value) => <>{formatSwapInterval(value.toNumber())}</>,
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
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (_, record: any) => (
        <div>
          <Button
            onClick={() => {
              setPositionInfo(record);
            }}
            className="btn-table-action w-32 mt-2"
          >
            Modify
          </Button>
          <Button
            onClick={() => {
              const terminateParams = [
                record.positionId,
                account,
                account,
                nativeCurrencyAddresses.includes(record.fromToken.contract),
              ];
              terminate(terminateParams);
            }}
            className="btn-table-action w-32 ml-2 mt-2"
          >
            Terminate
          </Button>
        </div>
      ),
    },
  ];
  return {
    columns,
    positions,
    isLoading,
    trxState,
    retry,
    positionInfo,
    modifyPosition,
    setPositionInfo,
  };
}

export default useDCATable;
