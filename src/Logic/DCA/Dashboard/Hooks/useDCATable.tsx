import { ColumnsType } from 'antd/lib/table';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import graph from '../../../../Assets/Icons/graph.svg';
import timeline from '../../../../Assets/Icons/timeline.svg';
import Button from '../../../../Components/Button/Button';
import { defaultChainId } from '../../../../Config/AppConfig';
import { nativeCurrencyAddresses } from '../../../../Config/ChainConfig';
import AuthContext from '../../../../Context/AuthContext';
import { RootState } from '../../../../Store';
import { TokenTypes } from '../../../../Types';
import { getChainInfoValue } from '../../../../Utils/ChainUtils';
import { getAlternateTokenIcon } from '../../../../Utils/GeneralUtils';
import { PositionStatus } from '../Constants/enums';
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
  const { isUnsupportedChain } = useSelector(
    (state: RootState) => state.common,
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
      render: (status) => {
        let className = 'text-green-800 bg-green-300';
        let label = 'Running';
        if (status === PositionStatus.completed) {
          className = 'text-blue-800 bg-blue-300';
          label = 'Completed';
        } else if (status === PositionStatus.terminated) {
          className = 'text-red-800 bg-red-300';
          label = 'Terminated';
        }
        return (
          <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${className}`}
          >
            {label}
          </span>
        );
      },
    },
    {
      title: 'Chain',
      key: 'chainId',
      dataIndex: 'chainId',
      render: () => (
        <img
          className="h-6 w-6"
          src={getChainInfoValue(defaultChainId, 'icon')?.toString() || ''}
          alt=""
        />
      ),
    },
    {
      title: 'Interval',
      key: 'swapInterval',
      dataIndex: 'swapInterval',
      render: (value) => <>{formatSwapInterval(value.id)}</>,
    },
    {
      title: 'Remaining',
      key: 'remainingSwaps',
      dataIndex: 'remainingSwaps',
      render: (remainingSwaps, record: any) => (
        <>
          <span className="text-sm text-gray-400">{remainingSwaps}&nbsp;</span>
          {record.fromToken.symbol}
        </>
      ),
    },
    {
      title: 'To withdraw',
      key: 'toWithdraw',
      dataIndex: 'toWithdraw',
      render: (toWithdraw, record: any) => (
        <>
          <span className="text-sm text-gray-400">{toWithdraw}&nbsp;</span>
          {record.toToken.symbol}
        </>
      ),
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
            disabled={isUnsupportedChain}
            className="btn-table-action w-32 mt-2"
          >
            Modify
          </Button>
          <Button
            disabled={isUnsupportedChain}
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
