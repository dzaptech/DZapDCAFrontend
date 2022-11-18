import { ColumnsType } from 'antd/lib/table';
import { BigNumber } from 'ethers';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import iconTimeline from '../../../../Assets/Icons/timeline.svg';
import Button from '../../../../Components/Button/Button';
import { defaultChainId } from '../../../../Config/AppConfig';
import { nativeCurrencyAddresses } from '../../../../Config/ChainConfig';
import AuthContext from '../../../../Context/AuthContext';
import { RootState } from '../../../../Store';
import { TokenTypes } from '../../../../Types';
import { getChainInfoValue } from '../../../../Utils/ChainUtils';
import { abbreviateCurrency } from '../../../../Utils/GeneralUtils';
import { INVESTMENT_CYCLE } from '../../Create/Constants';
import { PositionActions } from '../Constants/enums';
import { TimelineType } from '../Types';
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
  const [timelineData, setTimelineData] = useState<TimelineType | undefined>(
    undefined,
  );

  const { account } = useContext(AuthContext);
  const { trxState } = useSelector((state: RootState) => state.dca);
  const { terminate, modifyPosition, retry, withdraw } = useActions();
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
            alt=""
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
            alt=""
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
        if (status === PositionActions.completed) {
          className = 'text-blue-800 bg-blue-300';
          label = 'Completed';
        } else if (status === PositionActions.terminated) {
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
      render: (value) => (
        <div>{INVESTMENT_CYCLE[+value.id]?.label || '2 min'}</div>
      ),
    },
    {
      title: 'Executed',
      key: 'totalExecutedSwaps',
      dataIndex: 'totalExecutedSwaps',
      render: (totalExecutedSwaps) => (
        <>
          <span className="text-sm text-gray-400">
            {totalExecutedSwaps}&nbsp;
          </span>
          Swaps
        </>
      ),
    },
    {
      title: 'Remaining',
      key: 'remainingSwaps',
      dataIndex: 'remainingSwaps',
      render: (remainingSwaps, record: any) => (
        <>
          <span className="text-sm text-gray-400">
            {abbreviateCurrency(
              BigNumber.from(record.rate).mul(remainingSwaps),
              record.fromToken.decimals,
            )}
            &nbsp;
          </span>
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
          <span className="text-sm text-gray-400">
            {abbreviateCurrency(toWithdraw, record.toToken.decimals)}&nbsp;
          </span>
          {record.toToken.symbol}
        </>
      ),
    },
    // {
    //   title: 'Buy Price',
    //   key: 'buyPrice',
    //   dataIndex: 'buyPrice',
    //   render: () => <img src={graph} alt="" />,
    // },
    {
      title: 'Timeline',
      key: 'history',
      dataIndex: 'history',
      render: (history, { fromToken, toToken }: any) => (
        <Button
          onClick={() =>
            setTimelineData({
              tokenInfo: { fromToken, toToken },
              history,
            })
          }
        >
          <img src={iconTimeline} alt="" />
        </Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (_, record: any) => (
        <div>
          {BigNumber.from(record.toWithdraw).gt(0) && (
            <Button
              onClick={() => {
                const terminateParams = [
                  record.positionId,
                  account,
                  nativeCurrencyAddresses.includes(record.fromToken.contract),
                ];
                withdraw(terminateParams);
              }}
              disabled={isUnsupportedChain}
              className="btn-table-action w-32 mt-2 mr-2"
            >
              Withdraw
            </Button>
          )}
          <Button
            onClick={() => {
              setPositionInfo(record);
            }}
            disabled={
              isUnsupportedChain || record.status !== PositionActions.active
            }
            className="btn-table-action w-32 mt-2"
          >
            Modify
          </Button>
          <Button
            disabled={
              isUnsupportedChain || record.status !== PositionActions.active
            }
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
    timelineData,
    setTimelineData,
  };
}

export default useDCATable;
