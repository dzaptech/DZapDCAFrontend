import { BigNumber } from 'ethers';
import { dcaVersion } from '../../../../Config/AppConfig';
import { DCA_CONTRACTS } from '../../../../Constants/ContractHistory';
import { TokenTypes } from '../../../../Types';
import {
  getInterface,
  initializeContract,
  initializeReadOnlyProvider,
} from '../../../../Utils/ContractUtils';
import {
  abbreviateNumber,
  currencyFormatter,
} from '../../../../Utils/GeneralUtils';
import { EVENT_CREATE_POSITION } from '../Constants';
import { PositionActions } from '../Constants/enums';
import { PositionHistoryType } from '../Types';

export const getPositionEventParams = (chainId: number, account: string) => {
  const abiPath = DCA_CONTRACTS[dcaVersion].abi;
  const contractAddress = DCA_CONTRACTS[dcaVersion][chainId];
  const provider = initializeReadOnlyProvider(chainId);
  const contract = initializeContract({ contractAddress, abiPath, provider });
  const blocks = { fromBlock: 30631655, toBlock: 'latest' };
  const event = EVENT_CREATE_POSITION;
  const filterParams = [account];
  const data = { blocks, filterParams, event };
  return {
    data,
    contract,
    provider,
    abiPath,
  };
};

export const parsePositionEventData = (
  result: any,
  abiPath: string,
  chainId: number,
) => {
  const abiInterface = getInterface(abiPath);
  const tokenAddresses: string[] = [];
  const data = result.map((item: any) => {
    const decodedInput = abiInterface.parseLog(item);
    const {
      finalSwap,
      fromToken,
      owner,
      positionId,
      rate,
      startingSwap,
      swapInterval,
      toToken,
    } = decodedInput.args;
    if (tokenAddresses.indexOf(fromToken, toToken) === -1) {
      tokenAddresses.push(fromToken.toLowerCase(), toToken.toLowerCase());
    }
    return {
      finalSwap,
      fromToken: fromToken.toLowerCase(),
      owner,
      positionId,
      rate,
      startingSwap,
      swapInterval,
      toToken: toToken.toLowerCase(),
      chainId,
    };
  });
  return {
    data,
    tokenAddresses,
  };
};

export const formatSwapInterval = (seconds: number) => {
  const hour = Math.floor(seconds / 3600);
  let interval = 'Monthly';
  if (hour === 24) {
    interval = 'Daily';
  } else if (hour === 168) {
    interval = 'Weekly';
  } else if (hour === 1) {
    interval = 'Hourly';
  }
  return interval;
};

export const parsePositionModifiedDesc = (
  item: PositionHistoryType,
  fromToken: TokenTypes,
) => {
  let description = '';
  const amount = BigNumber.from(item.rate).mul(item.remainingSwaps);
  const prevAmount = BigNumber.from(item.prevRate).mul(item.prevRemainingSwaps);
  const isAmountModified = !amount.eq(prevAmount);
  const amountModifyType = amount.gt(prevAmount)
    ? 'incremented'
    : 'decremented';

  const fromAmount = abbreviateNumber(
    currencyFormatter(prevAmount, fromToken.decimals),
    6,
  );
  const toAmount = abbreviateNumber(
    currencyFormatter(amount, fromToken.decimals),
    6,
  );
  const amountMsg = isAmountModified
    ? `Amount ${amountModifyType} from ${fromAmount} ${fromToken.symbol} to ${toAmount} ${fromToken.symbol}`
    : `Amount remains same ${toAmount} ${fromToken.symbol}`;

  const durationModifyType = BigNumber.from(item.remainingSwaps).gt(
    item.prevRemainingSwaps,
  )
    ? 'incremented'
    : 'decremented';
  if (item.action === PositionActions.modifyDuration) {
    description = `Duration ${durationModifyType} from ${item.prevRemainingSwaps} to ${item.remainingSwaps}, ${amountMsg}`;
  } else if (item.action === PositionActions.modifyRate) {
    description = `${amountMsg}, Duration remains same ${item.remainingSwaps}`;
  } else {
    description = `${amountMsg}, Duration ${durationModifyType} by ${Math.abs(
      +item.prevRemainingSwaps - +item.remainingSwaps,
    )}`;
  }
  return `Modify : ${description}`;
};
