import { dcaVersion } from '../../../../Config/AppConfig';
import { DCA_CONTRACTS } from '../../../../Constants/ContractHistory';
import {
  getInterface,
  initializeContract,
  initializeReadOnlyProvider,
} from '../../../../Utils/ContractUtils';
import { EVENT_CREATE_POSITION } from '../Constants';

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
  }
  return interval;
};
