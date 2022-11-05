/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { Contract, Provider } from 'ethers-multicall';
import { useState } from 'react';
import { initializeReadOnlyProvider } from '../Utils/ContractUtils';
import { Logger } from '../Utils/Exceptions';

function useMulticall() {
  const [error, setError] = useState<any>('');
  const [response, setResponse] = useState<any>('');

  const multicall = async (
    chainId: number,
    contracts: string[],
    abiPath: string,
    method: string,
    params: any,
  ) => {
    try {
      if (contracts.length > 0) {
        const { abi } = require(`../Artifacts/${abiPath}`);
        const ethcallProvider = new Provider(
          initializeReadOnlyProvider(chainId),
        );
        const contractCall = contracts.map((contract: string) => {
          const multicalContract = new Contract(contract, abi);
          return multicalContract[method](...params);
        });
        await ethcallProvider.init();
        const results = await ethcallProvider.all(contractCall);
        setResponse(results);
        return results;
      }
      return [];
    } catch (err) {
      Logger.error(err, { trxName: 'Multicall' });
      setError(err);
      return err;
    }
  };
  return {
    multicall,
    error,
    response,
  };
}
export default useMulticall;
