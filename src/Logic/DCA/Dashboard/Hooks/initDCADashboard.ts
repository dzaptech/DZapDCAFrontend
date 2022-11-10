import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dcaVersion, defaultChainId } from '../../../../Config/AppConfig';
import { DCA_CONTRACTS } from '../../../../Constants/ContractHistory';
import {
  getInterface,
  initializeContract,
  initializeReadOnlyProvider,
} from '../../../../Utils/ContractUtils';

import { EVENT_CREATE_POSITION } from '../Constants';
import { setIsLoading, setPositions } from '../Store';

function initDCADashboard() {
  const dispatch = useDispatch();
  const parseEventData = (result: any, abiPath: string, chainId: number) => {
    const abiInterface = getInterface(abiPath);
    const output = result.map((item: any) => {
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
      return {
        finalSwap,
        fromToken,
        owner,
        positionId,
        rate,
        startingSwap,
        swapInterval,
        toToken,
        chainId,
      };
    });
    return output;
  };

  const getPastEvent = async (contract: any, provider: any, data: any) => {
    try {
      const { blocks, filterParams, event } = data;
      let filter = contract.filters[event](...filterParams);
      filter = {
        ...filter,
        ...blocks,
      };
      const res = await provider.getLogs(filter);
      return res;
    } catch (error) {
      console.log('getPastEvent', error);
      return error;
    }
  };

  const getParams = (chainId: number) => {
    const abiPath = DCA_CONTRACTS[dcaVersion].abi;
    const contractAddress = DCA_CONTRACTS[dcaVersion][chainId];
    const provider = initializeReadOnlyProvider(chainId);
    const contract = initializeContract({ contractAddress, abiPath, provider });
    const blocks = { fromBlock: 30631655, toBlock: 'latest' };
    const event = EVENT_CREATE_POSITION;
    const filterParams = [null, null, null, null];
    const data = { blocks, filterParams, event };
    return {
      data,
      contract,
      provider,
      abiPath,
    };
  };
  const getPositions = async (chainId: number) => {
    try {
      const { contract, provider, data, abiPath } = getParams(chainId);
      const result = await getPastEvent(contract, provider, data);
      const parseData = parseEventData(result, abiPath, chainId);
      dispatch(setPositions(parseData));
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };
  useEffect(() => {
    getPositions(defaultChainId);
  }, []);
}

export default initDCADashboard;
